import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lawyer.css";

const API_BASE_URL = "http://127.0.0.1:5006"; // ✅ Correct Backend Port

function LawyerPage() {
  const [lawyers, setLawyers] = useState([]);
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [bookingLink, setBookingLink] = useState(""); // ✅ Added Booking Link
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch lawyers from backend
  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("qualification", qualification);
    formData.append("booking_link", bookingLink); // ✅ Include Booking Link
    formData.append("image", image);

    try {
      await axios.post(`${API_BASE_URL}/add_lawyer`, formData);
      fetchLawyers(); // ✅ Refresh list after adding

      // Reset form
      setName("");
      setQualification("");
      setBookingLink(""); // ✅ Reset Booking Link
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding lawyer:", error);
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // ✅ Show image preview before upload
  };

  // Handle delete lawyer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lawyer?")) return; // ✅ Confirmation before deleting

    try {
      await axios.delete(`${API_BASE_URL}/delete_lawyer/${id}`);
      fetchLawyers(); // ✅ Refresh list after deletion
    } catch (error) {
      console.error("Error deleting lawyer:", error);
    }
  };

  return (
    <div className="lawyer-page">
      <h2>Add a Lawyer</h2>
      <form onSubmit={handleSubmit} className="lawyer-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
        <input type="url" placeholder="Booking Link" value={bookingLink} onChange={(e) => setBookingLink(e.target.value)} required /> {/* ✅ Booking Link Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        <button type="submit">Add Lawyer</button>
      </form>

      <h2>Lawyers List</h2>
      {lawyers.map((lawyer) => (
        <div className="lawyer-card" key={lawyer.id}>
          <div className="profile-section">
            <img src={`${API_BASE_URL}/uploads/${lawyer.image}`} alt={lawyer.name} className="profile-icon" />
          </div>
          <div className="info-section">
            <strong>{lawyer.name}</strong>
            <p>{lawyer.qualification}</p>
          </div>
          <div className="actions">
            <a href={lawyer.booking_link} target="_blank" rel="noopener noreferrer">
              <button className="book-btn">BOOK NOW</button>
            </a> {/* ✅ Dynamic Booking Link */}
            <button className="delete-btn" onClick={() => handleDelete(lawyer.id)}>❌ Delete</button> {/* ✅ Delete Button */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LawyerPage;
