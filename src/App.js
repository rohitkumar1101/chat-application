import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { chatGPTResponse } from './api';

const socket = io('http://localhost:4001');

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = async () => {
    socket.emit('message', newMessage);
    let response = await chatGPTResponse(newMessage)
    console.log(response, "RESPONSE");
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div className="chat">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
