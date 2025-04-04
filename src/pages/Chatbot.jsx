import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const LegalBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      sender: 'bot',
      text: 'Hello! I\'m Legaloop, your legal assistant focusing on Indian laws with Kerala-specific expertise. How can I help you today?',
      timestamp: new Date().toISOString()
    }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Replace this with your actual API call
      const botResponse = await generateLegalResponse(input);
      
      const botMessage = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const generateLegalResponse = async (query) => {
    // This is a mock function - replace with your actual API call
    // The response formatting will remain the same
    
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('company registration') || lowerQuery.includes('business registration')) {
      return `
      <div class="legal-response">
        <h3>Company Registration Process in India</h3>
        
        <p>Here are the key legal requirements for registering a company in India:</p>
        
        <div class="legal-section">
          <h4>1. Choose Business Structure</h4>
          <ul>
            <li><strong>Private Limited Company:</strong> Most common for startups</li>
            <li><strong>LLP (Limited Liability Partnership):</strong> For professional services</li>
            <li><strong>One Person Company:</strong> For solo entrepreneurs</li>
          </ul>
        </div>
        
        <div class="legal-section">
          <h4>2. Documentation Required</h4>
          <ul>
            <li>Digital Signature Certificate (DSC) for directors</li>
            <li>Director Identification Number (DIN)</li>
            <li>Name approval from MCA (RUN service)</li>
            <li>Registered office proof</li>
          </ul>
        </div>
        
        <div class="legal-section">
          <h4>3. Kerala-Specific Requirements</h4>
          <ul>
            <li>Additional trade license from local municipality</li>
            <li>Registration under Kerala Shops & Establishment Act</li>
            <li>Compliance with Kerala Labour Welfare Fund rules</li>
          </ul>
        </div>
        
        <div class="legal-section">
          <h4>4. Ongoing Compliance</h4>
          <ul>
            <li>GST registration if turnover exceeds ₹40 lakhs (₹20 lakhs for Kerala)</li>
            <li>Professional tax registration in Kerala</li>
            <li>Annual filings with MCA</li>
          </ul>
        </div>
        
        <p class="note">Processing time: 10-15 days for complete registration</p>
      </div>
      `;
    }
    
    if (lowerQuery.includes('website') || lowerQuery.includes('online business')) {
      return `
      <div class="legal-response">
        <h3>Legal Requirements for Websites/Online Business in India</h3>
        
        <div class="legal-section">
          <h4>Mandatory Requirements:</h4>
          <ul>
            <li><strong>Privacy Policy:</strong> Required under IT Act, 2000</li>
            <li><strong>Terms of Service:</strong> Legally binding agreement</li>
            <li><strong>Refund Policy:</strong> For e-commerce businesses</li>
          </ul>
        </div>
        
        <div class="legal-section">
          <h4>Kerala-Specific Considerations:</h4>
          <ul>
            <li>Compliance with Kerala GST regulations</li>
            <li>Registration under Kerala Professional Tax if applicable</li>
            <li>Adherence to Kerala Consumer Protection guidelines</li>
          </ul>
        </div>
      </div>
      `;
    }
    
    return `
    <div class="legal-response">
      <p>I specialize in Indian legal matters with Kerala-specific expertise. Here's how I can help:</p>
      
      <div class="legal-section">
        <h4>Common Legal Topics:</h4>
        <ul>
          <li>Company/business registration</li>
          <li>GST and taxation</li>
          <li>Employment laws</li>
          <li>Property/real estate laws</li>
          <li>Intellectual property rights</li>
        </ul>
      </div>
      
      <p>Please ask about any specific legal requirement in India, and I'll provide detailed information with Kerala-specific aspects where relevant.</p>
    </div>
    `;
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
            <div 
              key={index} 
              className={`message ${message.sender}`}
            >
              {message.sender === 'bot' ? (
                <div 
                  className="bot-message-content"
                  dangerouslySetInnerHTML={{ __html: message.text }}
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
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? (
              <span className="spinner"></span>
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