import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSun, FaMoon, FaPaperPlane } from 'react-icons/fa';
import copyIcon from '../assets/copyIcon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import copyIcon from '../assets/copyIcon.png'; // Import your custom icon
import HomeIcon from '../assets/images.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate('/Homepage', { state: { isUser: true } });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const options = {
    method: 'POST',
    url: 'http://localhost:3000/ask',
    headers: {
      'x-rapidapi-key': 'a17cd95387msha606f79b49f34eap1bb3a4jsndf11b2d013e9',
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'user',
          content: 'answer according to ' + localStorage.getItem('file') + ' the question is ' + inputValue,
        },
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 10000,
      web_access: false,
    },
  };

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = darkMode ? '#18181b' : '#ffffff';
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, [darkMode]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userMessage = { type: 'user', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const aiResponse = await axios.request(options);
      const aiMessage = aiResponse.data.result;
      displayAiMessageLetterByLetter(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const displayAiMessageLetterByLetter = (message) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.type === 'ai') {
            const updatedMessage = { ...lastMessage, text: lastMessage.text + message[index] };
            return [...prevMessages.slice(0, -1), updatedMessage];
          }
          return [...prevMessages, { type: 'ai', text: message[index] }];
        });
        index++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 50);
  };

  const copyMessageToClipboard = async (messageText) => {
    try {
      await navigator.clipboard.writeText(messageText);
      alert('Message copied!');
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`chat-header ${darkMode ? 'dark-mode' : ''}`}>
        <h2 style={{ textAlign: 'center' }}>Q-GPT</h2>
        <div onClick={handleHomeNavigation} className="home-icon">
          <FaHome size={24} className="cursor-pointer" />
        </div>
        <div className="toggle">
        
  <span className="icon" onClick={toggleDarkMode}>
    {darkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
  </span>

        </div>
      </div>
      <div className={`chat-window ${darkMode ? 'dark-mode' : ''}`} id="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            <div className={`message-content ${darkMode ? 'dark-mode' : ''}`}>{message.text}</div>
            <img src={copyIcon} alt="Copy" className="ml-2 cursor-pointer mt-2 w-5 h-5" onClick={() => copyMessageToClipboard(message.text)} title="Copy message" />
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="dot-flashing"></div>
          </div>
        )}
      </div>
      <div className={`chat-input-container ${darkMode ? 'dark-mode' : ''}`}>
        <input
          type="text"
          id="chat-input"
          className={`w-full p-2 rounded-md ${darkMode ? 'dark-mode' : ''}`}
          placeholder="Type your query here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button type="submit" id="send-button" onClick={sendMessage}>
          <FaPaperPlane size={18} />
        </button>
      </div>

      <style jsx>{`
        :root {
          --background-color-light: #f7f7f7;
          --background-color-dark: #2c2c2c;
          --chat-container-background-light: #fff;
          --chat-container-background-dark: #333;
          --text-color-light: #000;
          --text-color-dark: #fff;
          --header-background-light: #007bff;
          --header-background-dark: #0056b3;
          --input-background-light: #f1f1f1;
          --input-background-dark: #444;
          --message-background-light: #007bff;
          --message-background-dark: #0056b3;
          --bot-message-background-light: #e4e6eb;
          --bot-message-background-dark: #555;
        }

        body {
          font-family: Arial, sans-serif;
          background-color: var(--background-color-light);
          color: var(--text-color-light);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          transition: background-color 0.3s, color 0.3s;
          position: relative;
        }

        body.dark-mode {
          background-color: var(--background-color-dark);
          color: var(--text-color-dark);
        }

        .chat-container {
          width: 600px;
          height: 800px;
          background-color: var(--chat-container-background-light);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: background-color 0.3s;
        }

        .chat-container.dark-mode {
          background-color: var(--chat-container-background-dark);
        }

        .chat-header {
          background-color: var(--header-background-light);
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s;
        }

        .chat-header.dark-mode {
          background-color: var(--header-background-dark);
        }

        .chat-window {
          flex-grow: 1;
          padding: 20px;
          overflow-y: auto;
          border-bottom: 1px solid #ddd;
          background-color: var(--chat-container-background-light);
          transition: background-color 0.3s;
        }

        .chat-window.dark-mode {
          background-color: var(--chat-container-background-dark);
        }

        .chat-message {
          display: flex;
          margin-bottom: 15px;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message .message-content {
          max-width: 70%;
          padding: 10px 15px;
          border-radius: 20px;
          background-color: var(--message-background-light);
          color: white;
          position: relative;
          transition: background-color 0.3s;
        }

        .chat-message.user .message-content {
          background-color: var(--message-background-light);
        }

        .chat-message.ai .message-content {
          background-color: var(--bot-message-background-light);
          color: var(--text-color-dark);
        }

        .chat-message.ai .message-content.dark-mode {
          background-color: var(--bot-message-background-dark);
          color: var(--text-color-light);
        }

        .message-content.dark-mode {
          color: var(--text-color-dark);
        }

        .chat-input-container {
          display: flex;
          border-top: 1px solid #ddd;
          padding: 10px;
          background-color: var(--input-background-light);
          transition: background-color 0.3s;
        }

        .chat-input-container.dark-mode {
          background-color: var(--input-background-dark);
        }

        #chat-input {
          flex-grow: 1;
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: var(--input-background-light);
          color: var(--text-color-light);
          transition: background-color 0.3s;
        }

        #chat-input.dark-mode {
          background-color: var(--input-background-dark);
          color: var(--text-color-dark);
        }

        #send-button {
          background-color: var(--message-background-light);
          border: none;
          padding: 0 15px;
          margin-left: 10px;
          border-radius: 4px;
          cursor: pointer;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-flashing {
          position: relative;
          width: 1em;
          height: 1em;
          border-radius: 0.5em;
          background: #6b7280;
          color: #6b7280;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }

        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          width: 1em;
          height: 1em;
          border-radius: 0.5em;
          background: #6b7280;
          color: #6b7280;
          animation: dotFlashing 1s infinite alternate;
        }

        .dot-flashing::before {
          left: -1.5em;
          animation-delay: 0s;
        }

        .dot-flashing::after {
          left: 1.5em;
          animation-delay: 1s;
        }

        .toggle {
          display: flex;
          align-items: center;
        }

        .toggle .label {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--background-color-light);
          border-radius: 12px;
          margin-left: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .toggle .button {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s;
        }

        .toggle input:checked + .label .button {
          transform: translateX(16px);
        }

        .chat-header .home-icon {
          cursor: pointer;
        }

        .chat-header .home-icon:hover {
          color: #007bff;
        }

        .chat-message .ml-2 {
          margin-left: 8px;
        }

        .chat-message .ml-2:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
=======
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeNavigation = () => {
    navigate('/Homepage', { state: { isUser: localStorage.getItem("loggedIn") != null } });
  };

  useEffect(() => {
    // Set the background of the page
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#18181b';
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userMessage = { type: 'user', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'answer according to ' + localStorage.getItem('file') + ' the question is ' + inputValue }]
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: result }]);
      }

      setIsLoading(false);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const copyMessageToClipboard = async (messageText) => {
    try {
      await navigator.clipboard.writeText(messageText);
      alert('Message copied!');
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  };

  return (
    <div className="fixed bottom-10 mx-4 w-9/12 border max-w-none p-2.5 bg-[#2e2e31] rounded-lg shadow-md">
      <div className="absolute top-0 right-0 p-4">
        <div onClick={handleHomeNavigation}>
          <img src={HomeIcon} alt="Home" className="w-10 h-10 cursor-pointer" />
        </div>
      </div>

      <div className="overflow-auto p-2 h-[650px] mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`text-white p-2 rounded-[40px] mx-[500px] my-[20px] ${message.type === 'user' ? 'bg-[#3c3c40] text-left ml-auto' : ' text-right mr-auto'} break-words max-w-full`}>
            <span>{message.text}</span>
            <img src={copyIcon} alt="Copy" className="ml-2 cursor-pointer mt-2 w-5 h-5" onClick={() => copyMessageToClipboard(message.text)} title="Copy message" />
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          className="w-full p-2 bg-[#2e2e31] text-white rounded-md"
          placeholder="Type your query here...."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default Chatbot;
