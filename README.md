# Frontend for Q-gpt

This project aims to solve the cumbersome and time-consuming process of data retrieval from databases by providing a chatbot-like interface to query in English for faster and more reliable responses.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [Help](#Help)

## Overview

The frontend of Q-gpt is a React-based application that interacts with the backend services to provide a user-friendly interface for querying data. It includes features for user authentication, file uploads, and data visualization.

## Features

- User authentication (Sign Up, Login, Google Sign-In)
- File upload functionality
- Data visualization capabilities
- Responsive design for various screen sizes

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KniteenK/Q-gpt-frontend.git
   cd q-gpt-frontend
2. Install dependencies:
   ```bash
   npm i
## Configuration
1. Create a .env file in the root directory and add the following environment variables:
   ```bash
   PORT = 3000
   DATABASE_URL=your-database-url (We used firebase realtime db)
   WEBKEY_API=your-webkey-api
   RAPIDAPI_KEY=your-rapidapi-key

## Usage
1. Start the development server :
    ```bash
    npm run start
2. Open your browser and navigate to http://localhost:3000 to access the application.
3. You'll have to run the backend too . (url for backend : https://github.com/KniteenK/Q-gpt-backend)

## Contribution 
If you want to contribute to this project, please fork the repository and create a pull request with your changes. Ensure that you follow the coding standards and provide appropriate tests.

## Help
If you have any suggestion , feedback or anything you want to say in general , you can reach out to me via email : kniteen38@gmail.com 
