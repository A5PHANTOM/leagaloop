import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const API_BASE_URL = 'http://localhost:5006'; // Adjust if your backend runs elsewhere

const LegalBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('legalbot-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{
        sender: 'bot',
        text: 'Hello! I\'m Legaloop, your legal assistant focusing on Indian laws with Kerala-specific expertise. How can I help you today?',
        timestamp: new Date().toISOString()
      }]);
    }
  }, []);

  // Save to localStorage on messages update
  useEffect(() => {
    localStorage.setItem('legalbot-messages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    const userMessage = {
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/generate`, { query });

      const botMessage = {
        sender: 'bot',
        text: response.data.response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    return { __html: text.replace(/\n/g, '<br/>') };
  };

  return (
    <div className="legal-bot-container">
      <div className="legal-bot-header">
        <div className="logo-container">
          <div className="logo-circle">
            <span>LL</span>
          </div>
          <h1>Legaloop India</h1>
        </div>
        <p className="tagline">Indian Legal Expert • Kerala Specialization</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'bot' ? (
                <div 
                  className="bot-message-content"
                  dangerouslySetInnerHTML={formatResponse(message.text)}
                />
              ) : (
                <div className="user-message-content">
                  {message.text}
                </div>
              )}
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Indian legal requirements..."
            disabled={loading}
            aria-label="Type your legal question"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className={loading ? 'loading' : ''}
          >
            {loading ? (
              <span className="spinner" aria-hidden="true"></span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>

      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> Provides general information about Indian laws. For Kerala-specific or complex matters, consult a qualified advocate.</p>
      </div>
    </div>
  );
};

export default LegalBot;
