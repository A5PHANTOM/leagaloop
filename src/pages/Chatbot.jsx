import React, { useState } from 'react';
import './Chatbot.css'; // Import external CSS

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
      if (data.response) {
        setResponse(formatResponse(data.response)); // Format response
      } else {
        setResponse('No valid response returned from the server.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error generating content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (responseText) => {
    // Split and format response into bullet points
    const lines = responseText.split('*').filter((line) => line.trim());
    return lines.map((line, index) => <p key={index} className="chatbot-response-item">&#8226; {line.trim()}</p>);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">Legal Chatbot</h1>
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          value={userQuery}
          onChange={handleInputChange}
          placeholder="Ask about legal procedures"
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
      {response && <div className="chatbot-response">{response}</div>}
    </div>
  );
};

export default Chatbot;
