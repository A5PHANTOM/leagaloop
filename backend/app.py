from flask_cors import CORS
from flask import Flask, request, jsonify, make_response, send_from_directory
import logging
import google.generativeai as genai
import os
import sqlite3
from datetime import datetime
from werkzeug.utils import secure_filename

# Set up logging
logging.basicConfig(
    filename='script_logs.log',
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# ============ Configuration ============
# Chatbot Configuration
genai.configure(api_key="AIzaSyD7AsWA8k_waSVS3DoF1XUNQaiBpjvsdso")
model = genai.GenerativeModel("gemini-1.5-flash")
CHAT_HISTORY_FILE = "conversation_history.txt"

# Lawyer System Configuration
UPLOAD_FOLDER = 'uploads'
DATABASE = 'lawyers.db'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ============ Database Setup ============
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db_connection() as conn:
        conn.execute('''
        CREATE TABLE IF NOT EXISTS lawyers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            qualification TEXT NOT NULL,
            booking_link TEXT NOT NULL,
            image TEXT NOT NULL
        )
        ''')
        conn.commit()

# ============ Helper Functions ============
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def read_conversation_history():
    try:
        if os.path.exists(CHAT_HISTORY_FILE):
            with open(CHAT_HISTORY_FILE, "r", encoding="utf-8") as f:
                return f.read()
        return ""
    except Exception as e:
        logging.error(f"History read error: {str(e)}")
        return ""

def log_conversation(user_input, ai_response):
    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(CHAT_HISTORY_FILE, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] USER: {user_input}\n")
            f.write(f"[{timestamp}] AI: {ai_response}\n\n")
    except Exception as e:
        logging.error(f"Logging error: {str(e)}")

# ============ Chatbot Endpoints ============
@app.route('/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        user_query = data.get("query", "").strip()

        if not user_query:
            return jsonify({"error": "Query cannot be empty"}), 400

        full_history = read_conversation_history()
        prompt = f"""You are Legaloop, a helpful AI assistant. 
        Conversation History:
        {full_history}
        
        Important: 
        - Your name is Legaloop
        - When asked your name, respond with "My name is Legaloop"
        
        User Query: {user_query}
        
        Response:"""
        
        response = model.generate_content(prompt)
        
        if not response or not response.text:
            return jsonify({"error": "Empty response from AI"}), 500
            
        bot_response = response.text.strip()
        log_conversation(user_query, bot_response)

        return _corsify_response(jsonify({
            "status": "success",
            "response": bot_response,
            "timestamp": datetime.now().isoformat()
        }))

    except Exception as e:
        logging.error(f"Error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": str(e)}), 500)

# ============ Lawyer System Endpoints ============
@app.route('/lawyers', methods=['GET', 'OPTIONS'])
def get_lawyers():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    conn = get_db_connection()
    lawyers = conn.execute('SELECT * FROM lawyers').fetchall()
    conn.close()
    return _corsify_response(jsonify([dict(lawyer) for lawyer in lawyers]))

@app.route('/add_lawyer', methods=['POST', 'OPTIONS'])
def add_lawyer():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    if 'image' not in request.files:
        return _corsify_response(jsonify({'error': 'No image file provided'}), 400)
    
    file = request.files['image']
    if file.filename == '':
        return _corsify_response(jsonify({'error': 'No selected file'}), 400)
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        name = request.form.get('name')
        qualification = request.form.get('qualification')
        booking_link = request.form.get('booking_link')
        
        if not all([name, qualification, booking_link]):
            return _corsify_response(jsonify({'error': 'Missing required fields'}), 400)
        
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO lawyers (name, qualification, booking_link, image) VALUES (?, ?, ?, ?)',
            (name, qualification, booking_link, filename)
        )
        conn.commit()
        conn.close()
        
        return _corsify_response(jsonify({'message': 'Lawyer added successfully'}), 201)
    else:
        return _corsify_response(jsonify({'error': 'Invalid file type'}), 400)

@app.route('/delete_lawyer/<int:lawyer_id>', methods=['DELETE', 'OPTIONS'])
def delete_lawyer(lawyer_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    conn = get_db_connection()
    lawyer = conn.execute('SELECT * FROM lawyers WHERE id = ?', (lawyer_id,)).fetchone()
    
    if not lawyer:
        conn.close()
        return _corsify_response(jsonify({'error': 'Lawyer not found'}), 404)
    
    try:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], lawyer['image']))
    except OSError:
        pass
    
    conn.execute('DELETE FROM lawyers WHERE id = ?', (lawyer_id,))
    conn.commit()
    conn.close()
    
    return _corsify_response(jsonify({'message': 'Lawyer deleted successfully'}), 200)

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# ============ CORS Helpers ============
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_response(response, status_code=None):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.add('Pragma', 'no-cache')
    response.headers.add('Expires', '0')
    if status_code:
        response.status_code = status_code
    return response

# ============ Startup ============
if __name__ == '__main__':
    init_db()
    if not os.path.exists(CHAT_HISTORY_FILE):
        with open(CHAT_HISTORY_FILE, 'w') as f:
            f.write("Conversation History:\n\n")
    app.run(host='0.0.0.0', port=5006, debug=True)