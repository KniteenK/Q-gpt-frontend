// FeaturesSection.js
import React from 'react';
import { FaCog, FaTable, FaList, FaFolder, FaSearch, FaLock } from 'react-icons/fa';

const FeaturesSection = ({ darkMode }) => {
    return (
        <div className="w-full max-w-screen-lg mt-12">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaCog className="text-3xl text-green-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Centralized web data management and Dynamic data handling capabilities</h3>
                    </div>
                </div>
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaTable className="text-3xl text-blue-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Real-time querying of JSON or CSV data</h3>
                    </div>
                </div>
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaList className="text-3xl text-purple-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Improved data organization</h3>
                    </div>
                </div>
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaFolder className="text-3xl text-orange-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Simple data storage and retrieval for uploaded JSON or CSV files</h3>
                    </div>
                </div>
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaSearch className="text-3xl text-red-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Query optimization tools for fast and efficient searching</h3>
                    </div>
                </div>
                <div className={`flex items-start space-x-4 p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <FaLock className="text-3xl text-yellow-500" />
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Data encryption and Secure sessions</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
