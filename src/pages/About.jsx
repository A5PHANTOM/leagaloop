import React,{useState} from 'react'
import './About.css';
import NavBar from './NavBar';
function About() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="about-container">
      <h1 className="about-title">About</h1>
      <p className="about-intro">
        Legaloop is a legal advice and assistance platform. Our mission is to make legal guidance accessible, understandable, and empowering for everyone.
      </p>
      
      <div className="mission-section">
        <div className="mission-text">
          <h2 className="mission-title">Our Mission</h2>
          <p>
            Legaloop exists to make legal advice simple, accessible, and approachable for everyone. 
            We aim to bridge the gap between people and the often complex, intimidating world of law 
            by combining technology with thoughtful design.
          </p>
        </div>
        <div className="mission-image">
          <img src="/src/assets/our-mission.webp" alt="Our Mission" />
        </div>
      </div>

      <div className="platform-description">
        <p>
          We are building a platform that empowers individuals to navigate legal challenges confidently. 
          Whether you need quick legal insights or guidance to make informed decisions, Legaloop is here to help.
        </p>
      </div>

      <div className="team-image">
      <img src="/src/assets/team.webp" alt="Team Working" />
      </div>
      </div>
    </div>
  )
}

export default About


