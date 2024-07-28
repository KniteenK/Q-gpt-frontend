import axios from 'axios';
import Papa from 'papaparse';
import React, { useCallback, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCog, FaTable, FaList, FaFolder, FaSearch, FaLock } from 'react-icons/fa';
import FeaturesSection from './FeaturesSection';

const Homepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isUser, setIsUser] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (location.state && location.state.isUser) {
            setIsUser(location.state.isUser);
        }
    }, [location.state]);

    const handleLogin = () => {
        navigate('/Login', { state: { isSignup: false } });
    };

    const handleSignup = () => {
        navigate('/Login', { state: { isSignup: true } });
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        toast.success('Logged out successfully');
        setIsUser(false);
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setDragging(false);

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const file = event.dataTransfer.items[0].getAsFile();
            const validTypes = ['application/json', 'text/csv'];

            if (validTypes.includes(file.type)) {
                setFiles((currentFiles) => [...currentFiles, file]);
            } else {
                toast.warn("Invalid file type. Please drop a JSON or CSV file.");
            }
        }
    }, []);

    const handleDrag = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handleDragState = useCallback((isDragging) => {
        return (event) => {
            event.preventDefault();
            setDragging(isDragging);
        };
    }, []);

    const handleChange = (event) => {
        const file = event.target.files[0];
        const validTypes = ['application/json', 'text/csv'];

        if (validTypes.includes(file.type)) {
            setFiles((currentFiles) => [...currentFiles, file]);
        } else {
            toast.warn("Invalid file type. Please select a JSON or CSV file.");
            event.target.value = "";
        }
    };

    const handleUploadFiles = async () => {
        if (files.length === 0) {
            toast.info("No files selected. Please select a JSON or CSV file.");
            return;
        }
        if (!isUser) {
            toast.info('Please log in first.');
            return;
        }

        setUploading(true);

        const convertCSVToJSON = (file) => {
            return new Promise((resolve, reject) => {
                Papa.parse(file, {
                    header: true,
                    complete: (result) => {
                        resolve(result.data);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            });
        };

        try {
            let formData = new FormData();
            let isCSV = files[0].type === 'text/csv';
            let jsonData = files[0];

            if (isCSV) {
                jsonData = await convertCSVToJSON(files[0]);
                const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
                formData.append('file', jsonBlob, files[0].name.replace('.csv', '.json'));
            } else {
                formData.append('file', files[0]);
            }

            const response = await axios.post('http://localhost:3000/api/upload', formData);

            if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
                localStorage.setItem('file', JSON.stringify(jsonData));
                navigate('/Chatbot', { state: { isUser: true } });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        setFiles([]);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex flex-col items-center p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <header className="w-full flex justify-between items-center p-4 bg-opacity-80 backdrop-blur-sm">
                <h1 className="text-2xl font-bold">Q-Gpt.</h1>
                <div className="flex items-center space-x-4">
                    {isUser ? (
                        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Logout</button>
                    ) : (
                        <>
                            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Login</button>
                            <button onClick={handleSignup} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Signup</button>
                        </>
                    )}
                    <button onClick={toggleDarkMode} className="text-2xl focus:outline-none">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-1 w-full">
                <div
                    className={`border-4 border-dashed p-8 rounded-lg w-full max-w-screen-lg flex flex-col items-center justify-center text-center transition-colors ${dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-400 bg-white'} ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDrag}
                    onDragEnter={handleDragState(true)}
                    onDragLeave={handleDragState(false)}
                >
                    <input
                        id="fileInput"
                        name="files"
                        type="file"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        accept=".json,.csv,application/json,text/csv"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer text-blue-500 hover:text-blue-700">
                        Drag and drop files here or click to upload.
                    </label>
                    <ul className="mt-4">
                        {files.map((file, index) => (
                            <li key={index} className="text-gray-600">{file.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex flex-col md:flex-row">
                    <button
                        onClick={handleUploadFiles}
                        className={`mr-0 md:mr-4 mb-4 md:mb-0 py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Files'}
                    </button>
                    <button onClick={handleCancel} className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors">Cancel</button>
                </div>
            <FeaturesSection />
            </main>
            <ToastContainer />
        </div>
    );
};

export default Homepage;
