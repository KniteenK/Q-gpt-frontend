import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import copyIcon from '../assets/copyIcon.png'; // Import your custom icon
import HomeIcon from '../assets/images.png';
const Chatbot = () => {
    
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading , setIsLoading] = useState(false);
    const navigate = useNavigate() ;

    const handleHomeNavigation = () => {
        navigate('/Homepage', { state: { isUser: true } });
    }

    const options = {
        method: 'POST',
        url:'http://localhost:3000/ask',
        headers: {
          'x-rapidapi-key': 'a17cd95387msha606f79b49f34eap1bb3a4jsndf11b2d013e9',
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          messages: [
            {
              role: 'user',
              content:'answer according to'+ localStorage.getItem('file') + 'the question is '+ inputValue
            }
          ],
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 10000,
          web_access: false
        }
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
        // setMessages([...messages, userMessage]);
        
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        
        setInputValue(''); 
        
        try {
            
            const aiResponse = await axios.request(options);
            console.log(aiResponse.data.result);
            setMessages((prevMessages) => [...prevMessages, {type:'ai',text:aiResponse.data.result}]);
            console.log(messages);
            setIsLoading(false) ;
            
        } catch (error) {
            console.error('Error sending message:', error);
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