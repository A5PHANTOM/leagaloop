from flask_cors import CORS
from flask import Flask, request, jsonify
import logging
import google.generativeai as genai

# Set up logging
logging.basicConfig(filename='script_logs.log', level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)

CORS(app)

# Configure Google Generative AI
genai.configure(api_key="AIzaSyD7AsWA8k_waSVS3DoF1XUNQaiBpjvsdso")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/')
def home():
    return "Welcome to the Legal Bot!"

# @app.route('/generate', methods=['POST'])
# def generate_content():
#     try:
#         data = request.json
#         user_query = data.get("query", "")

#         if not user_query:
#             return jsonify({"error": "No query provided"}), 400

#         logging.info(f"Received query: {user_query}")

#         # Generate content using Google Generative AI
#         response = model.generate_content(user_query)

#         logging.info(f"Generated response: {response.text}")
#         return jsonify({"response": response.text})
#     except Exception as e:
#         logging.error(f"Error generating content: {e}")
#         return jsonify({"error": "Internal server error"}), 500

@app.route('/generate', methods=['GET', 'POST'])
def generate_content():
    if request.method == 'GET':
        return jsonify({"message": "Use POST to send a query to this endpoint."})
    if request.method == 'POST':
        try:
            data = request.json
            user_query = data.get("query", "")

            if not user_query:
                return jsonify({"error": "No query provided"}), 400

            # Generate content using Google Generative AI
            response = model.generate_content(user_query)
            return jsonify({"response": response.text})
        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5006, debug=True)
