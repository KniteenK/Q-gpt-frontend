import React from 'react';

const Homepage = () => {
    console.log("Hello");
    return (
        <div>
            <header className="flex justify-between p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Signup</button>
            </header>
            <h1 className="text-center text-3xl text-black">Website Heading</h1>
        </div>
    );
};

export default Homepage;