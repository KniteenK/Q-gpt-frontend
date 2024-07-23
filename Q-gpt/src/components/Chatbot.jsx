import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdHome, MdLightMode } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import copyIcon from '../assets/copyIcon.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate('/Homepage', { state: { isUser: localStorage.getItem("loggedIn") != null } });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#18181b' : '#FFF';
    return () => {
      document.body.style.backgroundColor = '#FFF';
    };
  }, [theme]);

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
    <div className={`fixed bottom-10 mx-4 w-9/12 border max-w-none p-2.5 ${theme === 'dark' ? 'bg-[#2e2e31]' : 'bg-white'} rounded-lg shadow-md`}>
      <div className="absolute top-0 right-0 p-4 flex items-center">
        <div onClick={handleHomeNavigation}>
        <MdHome className={`w-10 h-10 cursor-pointer mr-4 ${theme === 'light' ? 'text-gray-500' : 'text-white'}`} />
        </div>
        <div onClick={toggleTheme}>
        {theme === 'dark' ? <MdLightMode className="w-10 h-10 cursor-pointer text-white" /> : <MdDarkMode className="w-10 h-10 cursor-pointer text-gray-500" />}
        </div>
      </div>

      <div className="overflow-auto p-2 h-[650px] mb-4">
      {messages.map((message, index) => (
  <div key={index} className={`p-2 rounded-[40px] mx-[500px] my-[20px] ${message.type === 'user' ? 'bg-[#3c3c40] text-left ml-auto text-white' : (theme === 'dark' ? 'bg-[#3c3c40]' : 'bg-gray-500') + ' text-right mr-auto text-white'} break-words max-w-full`}>
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