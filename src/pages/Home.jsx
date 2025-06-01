import React from 'react';
import NavBar from './NavBar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center text-center">
      <NavBar />

      <div className="text-center p-10">
        <p className="text-gray-400 text-lg">January 10, 2025</p>
        <h1 className="text-5xl font-bold my-5">Introducing Legaloop</h1>
        
        <div className="flex flex-col md:flex-row justify-center gap-5 my-10">
          <button 
            className="bg-white text-black px-6 py-3 text-lg font-semibold rounded hover:bg-gray-200 transition" 
            onClick={() => (window.location.href = '/Chatbot')}>
            Try Legaloop →
          </button>
          {/* <button className="bg-gray-800 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-gray-700 transition">
            Buy Premium ✔
          </button> */}
        </div>
        
        <div className="text-left max-w-3xl mx-auto text-lg leading-relaxed px-5">
          <p>
            We’ve developed <strong>Legaloop</strong>, a legal bot designed to assist users in a conversational way.
            The dialogue format allows Legaloop to provide legal insights, answer follow-up questions, 
            clarify complex topics, and reject inappropriate or out-of-scope requests.
          </p>
          <p className="mt-4">
            <strong>Legaloop</strong> is built to empower individuals with quick and reliable legal advice, 
            making legal information more accessible and understandable.
          </p>
          <p className="mt-4">
            We are excited to introduce <strong>Legaloop</strong> and invite users to share feedback about its 
            performance, strengths, and areas for improvement. During this research preview, 
            Legaloop is available for free!
          </p>
        </div>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
