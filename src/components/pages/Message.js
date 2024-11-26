import React, { useState, useEffect } from 'react';
import 'C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/css-styles/Message.css';

function Message() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "coalition";
  const password = "skills-test";
  const auth = btoa(`${username}:${password}`);
  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

  const fetchMessages = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMessages(); 
  });

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="doctor-messages-container">
      <header className="messages-header">
        <h1>Dr Jose Simmons' Messages</h1>
        <p>View and respond to patient messages</p>
      </header>

      <section className="messages-list">
        <ul>
          {messages.map((message, index) => (
            <li key={index} className={message.read ? 'read' : 'unread'}>
              <div className="message-header">
                <span className="patient-name">{message.patientName}</span>
                <span className="message-date">{message.date}</span>
              </div>
              <div className="message-subject">
                <strong>{message.subject}</strong>
              </div>
              {!message.read && <span className="new-badge">New</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Message;
