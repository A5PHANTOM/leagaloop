import React, { useEffect, useState } from "react";
import "./Booking.css";
import NavBar from "./NavBar";

function Booking() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5006/lawyers") // ✅ Fetch lawyers from backend
      .then((response) => response.json())
      .then((data) => setLawyers(data))
      .catch((error) => console.error("Error fetching lawyers:", error));
  }, []);

  return (
    <div className="lawyer-page">
      <NavBar />
      <div className="title">
        <h1 className="heading-title">ADVOCATES AVAILABLE</h1>
      </div>

      {lawyers.length === 0 ? (
        <p>Loading...</p>
      ) : (
        lawyers.map((lawyer, index) => (
          <div className="lawyer-card" key={index}>
            <div className="profile-section">
              <img
                src={`http://127.0.0.1:5006/uploads/${lawyer.image}`} // ✅ Uses correct image URL
                alt={lawyer.name}
                className="profile-icon"
              />
            </div>
            <div className="info-section">
              <strong>{lawyer.name}</strong>
              <p>{lawyer.qualification}</p>
            </div>

            {/* ✅ Dynamic Booking Link */}
            <a href={lawyer.booking_link} target="_blank" rel="noopener noreferrer">
              <button className="book-btn">BOOK NOW</button>
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default Booking;
