import React, { useEffect, useState } from "react";
import "./Booking.css";
import NavBar from "./NavBar";

function Booking() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/lawyers") // Fetching from Flask Backend
      .then((response) => response.json())
      .then((data) => setLawyers(data))
      .catch((error) => console.error("Error fetching lawyers:", error));
  }, []);

  return (
    
    <div className="lawyer-page">
        <NavBar/>
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
                src={`http://127.0.0.1:5000/uploads/${lawyer.image}`} // Dynamically Load Image
                alt={lawyer.name}
                className="profile-icon"
              />
            </div>
            <div className="info-section">
              <strong>{lawyer.name}</strong>
              <p>{lawyer.qualification}</p>
            </div>
            <button className="book-btn" onClick={() => window.location.href = "https://wa.link/vm97ql"}>
  BOOK NOW
</button>

          </div>
        ))
      )}
    </div>
  );
}

export default Booking;
