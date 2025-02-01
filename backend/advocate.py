from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sqlite3

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Create Upload Folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ✅ Create Database Table
def create_table():
    conn = sqlite3.connect("lawyers.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS lawyers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            qualification TEXT NOT NULL,
            image TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()

create_table()

# ✅ API to Add Lawyer (Method Changed to POST)
@app.route("/add_lawyer", methods=["POST"])
def add_lawyer():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files["image"]
    name = request.form.get("name")
    qualification = request.form.get("qualification")

    if not name or not qualification:
        return jsonify({"error": "Name and qualification are required"}), 400

    if image.filename == "":
        return jsonify({"error": "No selected file"}), 400

    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)  # Save Image

    conn = sqlite3.connect("lawyers.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO lawyers (name, qualification, image) VALUES (?, ?, ?)", 
                   (name, qualification, image.filename))
    conn.commit()
    conn.close()

    return jsonify({"message": "Lawyer added successfully"}), 201

# ✅ API to Get All Lawyers
@app.route("/lawyers", methods=["GET"])
def get_lawyers():
    conn = sqlite3.connect("lawyers.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, qualification, image FROM lawyers")
    lawyers = [{"id": row[0], "name": row[1], "qualification": row[2], "image": row[3]} for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(lawyers)

# ✅ Route to Serve Uploaded Images
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ✅ Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
