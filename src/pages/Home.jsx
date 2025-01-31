import React,{useState} from 'react'
import './Home.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
function Home() {
  
  return (
    
    <div>
      <div>
         <NavBar/>
         </div>
       <div className="content">
        <p className="date">January 10, 2025</p>
        <h1>Introducing Legaloop </h1> 
        <div className="buttons">
        <button className="try-button" onClick={() => (window.location.href = '/Chatbot')}>
  Try Legaloop →
</button>

          <button className="buy-button">Buy Premium ✔</button>
        </div>
        <div className="description">
        <p>
          We’ve developed <strong>Legaloop</strong> , a legal bot designed to assist users in a conversational way. 
          The dialogue format allows Legaloop to provide legal insights, answer follow-up questions, 
          clarify complex topics, and reject inappropriate or out-of-scope requests.
        </p>
        <p>
          <strong>Legaloop</strong> is built to empower individuals with quick and reliable legal advice, 
          making legal information more accessible and understandable.
        </p>
        <p>
          We are excited to introduce <strong>Legaloop</strong> and invite users to share feedback about its 
          performance, strengths, and areas for improvement. During this research preview, 
          Legaloop is available for free!
        </p>
      </div>
      </div>
    </div>
  )
}

export default Home;
