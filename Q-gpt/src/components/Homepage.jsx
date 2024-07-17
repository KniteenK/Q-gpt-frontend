import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
    let navigate = useNavigate(); // hook for navigation
    const [dragging, setDragging] = useState(false); // state to handle drag 
    const [files, setFiles] = useState([]); // state to keep track of uploaded files

    // function to go on login page
    const handleLogin = () => {
        navigate('/Login'); 
    };

    // function to go on signup page
    const handleSignup = () => {
        navigate('/signup'); 
    };

    // function for file drop
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

    // function to prevent default behavior for drag over and drag enter events
    const handleDrag = useCallback((event) => {
        // This line prevents the default action that belongs to the event. For drag-over and drag-enter events, the default behavior is often to reject the drag-and-drop operation.
        event.preventDefault();
        // This line stops the event from propagating further. In other words, it prevents the event from being passed along to any parent elements. 
        event.stopPropagation();
    }, []);

    // function to update dragging state when dragging enters or leaves
    const handleDragState = useCallback((isDragging) => {
        return (event) => {
            event.preventDefault();
            setDragging(isDragging);
        };
    }, []);

    const handleChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        const fileType = file.type;
        const validTypes = ['application/json', 'text/csv'];
        
        if (validTypes.includes(fileType)) {
            console.log("Valid file type:", fileType);
            setFiles((currentFiles) => [...currentFiles, file]); // Add the selected file to the files state
        } else {
            // Invalid file type, reset the input
            alert("Invalid file type. Please select a JSON or CSV file.");
            event.target.value = ""; // Reset the file input
        }
    };

    // function to handle upload files
    const handleUploadFiles = async () => {
        if (files.length == 0) {
            alert("No files selected. Please select a JSON or CSV file.");
            return;
        }

        const data = new FormData() ;
        files.forEach((file, index) => {
            data.append(`file-${index}`, file);
        });

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
                // Redirect to chat interface or handle success state
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        
    };

    // function to handle cancel
    const handleCancel = () => {
        setFiles([]); // clear the files state

    };



    // Content that is actually rendered
    return (
        
        <div className="m-0 p-0 box-border">

            {/* login and signup here */}

            <div className="w-full mb-8">
                <header className="text-blue-500 text-right">
                    <button onClick={handleLogin} className="mr-2">Login /</button>
                    <button onClick={handleSignup}>Signup</button>
                </header>
            </div>

            {/* Website heading Here */}

            <div>
                <div className="text-center">
                    <h1 className="text-3xl text-black">Website Heading</h1>
                    <div className="flex justify-center mt-4 mx-20">
                        {/* Placeholder for additional content */}
                    </div>
                </div>
            </div>

            {/* Drag and drop box here */}

            <div
                className={`border-2 border-dashed p-10 ${dragging ? 'border-blue-500' : 'border-gray-300'}`}
                onDrop={handleDrop}
                onDragOver={handleDrag}
                onDragEnter={handleDragState(true)}
                onDragLeave={handleDragState(false)}
            >

                Drag and drop files here or click to upload.
                {/* Input format for file here here style display none hides shoose file button by default */}
                <input
                    type="file"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    // specifies which files to accept
                    accept=".json,.csv,application/json,text/csv"
                />

                <label htmlFor="fileInput" className="cursor-pointer">
                    <div className="mt-2 text-blue-500">Browse files</div>
                </label>

                {/* display list of uploaded files */}
                
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
        
           {/* Upload Cancel button here */}
            <div className="mt-6">
                <button onClick={handleUploadFiles} className="mr-2 py-2 px-4 bg-green-500 text-white border-none rounded-md">Upload Files</button>
                <button onClick={handleCancel} className="py-2 px-4 bg-red-500 text-white border-none rounded-md">Cancel</button>
            </div>
        </div>
    );
};

export default Homepage;