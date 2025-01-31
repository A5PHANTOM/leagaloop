import React, { useState } from 'react';
import './Chatbot.css'; // Ensure this has responsive styles

const Chatbot = () => {
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) {
      setError('Please enter a query.');
      return;
    }

    setResponse(null);
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5006/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response from the server.');
      }

      const data = await res.json();
      setResponse(data.response ? formatResponse(data.response) : 'No valid response returned.');
    } catch (err) {
      console.error('Error:', err);
      setError('Error generating content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (responseText) => {
    return responseText
      .split('*')
      .filter((line) => line.trim())
      .map((line, index) => (
        <p key={index} className="chatbot-response-item">
          • {line.trim()}
        </p>
      ));
  };

  return (
    <>
 
 <a href="/">
  <img className="logo" src="/src/assets/Legaloop.webp" alt="Legaloop Logo" />
</a>
      
      {/* Chatbot Wrapper - Pushes Content Below Navbar */}
      
        <div className="chatbot-container">
          <h1 className="chatbot-title">Legal Chatbot</h1>
          <form onSubmit={handleSubmit} className="chatbot-form">
            <input
              type="text"
              value={userQuery}
              onChange={handleInputChange}
              placeholder="Ask about legal procedures..."
              className="chatbot-input"
            />
            <button
              type="submit"
              disabled={loading}
              className={`chatbot-button ${loading ? 'disabled' : ''}`}
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </form>

          {loading && <p className="chatbot-loading">Loading...</p>}
          {error && <p className="chatbot-error">{error}</p>}
          {/* Scrollable Response Box */}
        {response && (
          <div className="chatbot-response-container">
            <div className="chatbot-response">{response}</div>
          </div>
        )}
          <div className='disclamation'><strong>
          I am not a licensed attorney and therefore cannot provide specific legal advice. For professional legal assistance, it is recommended that you consult a qualified lawyer</strong></div>
       
        </div>
    
    </>
  );
};

export default Chatbot;
