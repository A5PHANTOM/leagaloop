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
        <strong>Legaloop</strong> is a legal advice and assistance platform. Our mission is to make legal guidance accessible, understandable, and empowering for everyone.
      </p>
      
      <div className="mission-section">
        <div className="mission-text">
          <h2 className="mission-title">Our Mission</h2>
          <p>
            <strong>Legaloop</strong> exists to make legal advice simple , accessible, and approachable for everyone. 
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
          Whether you need quick legal insights or guidance to make informed decisions, <strong>Legaloop</strong> is here to <strong>help</strong>.
        </p>
      </div>

      <div className="team-image">
      <img src="/src/assets/team.webp" alt="Team Working" />
      </div>

      <div className="vision-section">
        
        <div className="vision-text">
          <h2 className="vision-title">Our Vision</h2>
          <p>
          We believe technology can transform how people interact with the legal system. Legaloop represents
           a step forward in making legal assistance inclusive, transparent, and efficient for all.
            <strong>Legaloop: Legal clarity, one conversation at a time.</strong></p>
          
        </div>
        <div className="vision-image">
          <img src="/src/assets/our-mission.webp" alt="Our vision" />
        </div>
      </div>
      <h1 className="Why-title">Why It Matters?</h1>

      <div className="Why-description">
  <p>
    Access to legal support is a fundamental right, but it often feels out of reach. 
    Legal systems can be daunting, costly, and hard to understand.
  </p>
  <p>Legaloop tackles these barriers by:</p>
  <ul>
    <li>Simplifying legal concepts for everyone.</li>
    <li>Offering instant, reliable advice powered by technology.</li>
    <li>Ensuring privacy and security in every interaction.</li>
  </ul>
</div>


  </div>
    </div>
  )
}

export default About


