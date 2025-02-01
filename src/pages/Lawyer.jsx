import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lawyer.css";

const API_BASE_URL = "http://127.0.0.1:5000";

function LawyerPage() {
  const [lawyers, setLawyers] = useState([]);
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState(null);

  // Fetch lawyers from backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/lawyers`).then((response) => {
      setLawyers(response.data);
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("qualification", qualification);
    formData.append("image", image);

    await axios.post(`${API_BASE_URL}/add_lawyer`, formData);
    
    // Refresh the lawyer list
    const response = await axios.get(`${API_BASE_URL}/lawyers`);
    setLawyers(response.data);

    setName("");
    setQualification("");
    setImage(null);
  };

  return (
    <div className="lawyer-page">
      <h2>Add a Lawyer</h2>
      <form onSubmit={handleSubmit} className="lawyer-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Lawyer</button>
      </form>

      <h2>Lawyers List</h2>
      {lawyers.map((lawyer) => (
        <div className="lawyer-card" key={lawyer.id}>
          <div className="profile-section">
            <img src={`${API_BASE_URL}/uploads/${lawyer.image}`} alt="Profile" className="profile-icon" />
          </div>
          <div className="info-section">
            <strong>{lawyer.name}</strong>
            <p>{lawyer.qualification}</p>
          </div>
          <button className="book-btn">BOOK NOW</button>
        </div>
      ))}
    </div>
  );
}

export default LawyerPage;
