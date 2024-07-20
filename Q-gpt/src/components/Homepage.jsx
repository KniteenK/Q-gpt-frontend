import axios from 'axios';
import Papa from 'papaparse';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    let navigate = useNavigate();
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);

    const handleLogin = () => {
        navigate('/Login');
    };

    const handleSignup = () => {
        navigate('/Chatbot');
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setDragging(false);

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const file = event.dataTransfer.items[0].getAsFile();
            const validTypes = ['application/json', 'text/csv'];

            if (validTypes.includes(file.type)) {
                console.log('Valid file dropped -> ', file);
                setFiles((currentFiles) => [...currentFiles, file]);
            } else {
                alert("Invalid file type. Please drop a JSON or CSV file.");
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
        const fileType = file.type;
        const validTypes = ['application/json', 'text/csv'];

        if (validTypes.includes(fileType)) {
            console.log("Valid file type:", fileType);
            setFiles((currentFiles) => [...currentFiles, file]);
        } else {
            alert("Invalid file type. Please select a JSON or CSV file.");
            event.target.value = "";
        }
    };

    const handleUploadFiles = async () => {
        if (files.length === 0) {
            alert("No files selected. Please select a JSON or CSV file.");
            return;
        }

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

            if (isCSV) {
                let jsonData = await convertCSVToJSON(files[0]);
                let jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
                formData.append('file', jsonBlob, files[0].name.replace('.csv', '.json'));
            } else {
                formData.append('file', files[0]);
            }

            console.log("Uploading", formData);

            const response = await axios.post('http://localhost:3000/api/upload', formData);

            if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
                // Redirect to chat interface or handle success state
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleCancel = () => {
        setFiles([]);
    };

    return (
        <div className="m-0 p-0 box-border">
            <div className="w-full mb-8">
                <header className="text-blue-500 text-right">
                    <button onClick={handleLogin} className="mr-2">Login /</button>
                    <button onClick={handleSignup}>Signup</button>
                </header>
            </div>

            <div>
                <div className="text-center">
                    <h1 className="text-3xl text-black">Q-Gpt</h1>
                    <div className="flex justify-center mt-4 mx-20">
                    </div>
                </div>
            </div>

            <div
                className={`border-2 border-dashed p-10 ${dragging ? 'border-blue-500' : 'border-gray-300'}`}
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragEnter={handleDragState(true)}
                onDragLeave={handleDragState(false)}
            >
                Drag and drop files here or click to upload.
                <input
                    name="files"
                    type="file"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    accept=".json,.csv,application/json,text/csv"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                    <div className="mt-2 text-blue-500">Browse files</div>
                </label>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
        
            <div className="mt-6">
                <button onClick={handleUploadFiles} className="mr-2 py-2 px-4 bg-green-500 text-white border-none rounded-md">Upload Files</button>
                <button onClick={handleCancel} className="py-2 px-4 bg-red-500 text-white border-none rounded-md">Cancel</button>
            </div>
        </div>
    );
};

export default Homepage;