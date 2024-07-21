import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Chatbot = () => {
    
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
          'x-rapidapi-key': 'a17cd95387msha606f79b49f34eap1bb3a4jsndf11b2d013e9',
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          messages: [
            {
              role: 'user',
              content:'answer according to'+ localStorage.getItem('file') + 'the question is '+inputValue
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
        const userMessage = { type: 'user', text: inputValue };
        // setMessages([...messages, userMessage]);
        
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        
        
        try {
            
            const aiResponse = await axios.request(options);
            const aiMessage = { type: 'ai', text: aiResponse.data.result };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            // console.log(aiResponse.data.result);
            
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