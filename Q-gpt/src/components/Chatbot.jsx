import axios from 'axios';
import React, { useEffect, useState } from 'react';
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
        const userMessage = { type: 'user', text: inputValue };
        setMessages([...messages, userMessage]);
    
        try {
            const response = await axios.post('/api/user_message', {
                message: inputValue
            });
            const aiResponse = { type: 'chatbot', text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            
        }
    
        setInputValue(''); 
    };

    return (
        <div className="fixed bottom-10 mx-4 w-9/12 border max-w-none p-2.5 bg-[#2e2e31] rounded-lg shadow-md">
            <div className="overflow-auto p-2 h-[650px] mb-4"> 
                {messages.map((message, index) => (
                    <div key={index} className={`text-white  p-2 rounded-[40px] mx-[500px] my-[20px] ${message.type === 'user' ? 'bg-[#3c3c40] text-left ml-auto' : ' text-right mr-auto'} break-words max-w-full`}>
                        {message.text}
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
                />
            </form>
        </div>
    );
}

export default Chatbot;