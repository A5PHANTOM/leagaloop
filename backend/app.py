from flask_cors import CORS
from flask import Flask, request, jsonify
import logging
import google.generativeai as genai
import os

# Set up logging
logging.basicConfig(filename='script_logs.log', level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Google Generative AI
genai.configure(api_key="AIzaSyD7AsWA8k_waSVS3DoF1XUNQaiBpjvsdso")
model = genai.GenerativeModel("gemini-1.5-flash")

# File to store conversation history
DATA_FILE = "data.txt"

# Function to read previous conversations
def read_conversation_history():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return file.read()
    return ""

# Function to log conversations
def log_conversation(user_query, bot_response):
    with open(DATA_FILE, "a", encoding="utf-8") as file:
        file.write(f"User: {user_query}\nBot: {bot_response}\n\n")

@app.route('/')
def home():
    return "Welcome to the Legal Bot!"

@app.route('/generate', methods=['POST'])
def generate_content():
    try:
        data = request.json
        user_query = data.get("query", "").strip()

        if not user_query:
            return jsonify({"error": "No query provided"}), 400

        # Get conversation history
        history = read_conversation_history()

        # Send user query + history for context
        full_prompt = f"Previous conversation:\n{history}\n\nNew query:\n{user_query}"
        response = model.generate_content(full_prompt)

        # Get response text
        bot_response = response.text.strip()

        # Log conversation
        log_conversation(user_query, bot_response)

        return jsonify({"response": bot_response})

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5006, debug=True)

