import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { GoogleAuthProvider , signInWithPopup } from 'firebase/auth' ;
import { auth } from './firebaseConfig.jsx';

=======
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> Stashed changes
const Login = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isSignup) {
      setIsSignUp(location.state.isSignup) ;
    }
  }, [location.state]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value); // Handler for confirm password

  const handleSubmit = async (e) => {
    e.preventDefault();
    // condition that check pass = confirm pass
    if (isSignUp && password !== confirmPassword) {
      toast.error('Password and confirmed password are not same.');
      return; 
    }
    const url = isSignUp ? 'http://localhost:3000/auth/signup' : 'http://localhost:3000/auth/login';
    const body = { email, password };

    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        localStorage.setItem('loggedIn', 'true');
        navigate('/Homepage', { state: { isUser: true } });
        const { token } = response.data;
        localStorage.setItem('authToken', token);
      }
      alert(isSignUp ? 'User created successfully' : 'Logged in successfully');
      navigate('/Homepage', { state: { isUser: true } });
    } catch (error) {
<<<<<<< Updated upstream
      alert('An error occurred. Please try again.');
=======
      toast.error(error.response.data.message || 'An error occurred. Please try again.');
>>>>>>> Stashed changes
    }
  };

  const handleGoogleSignIn = async () => {
    const url = 'http://localhost:3000/auth/google';
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth , provider) ;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken ;
      const user = result.user.email ;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('authToken', token);
      navigate('/Homepage', { state: { isUser: true } });
      

    } catch(error) {
      alert('An error occurred. Please try again.');
      console.log(error) ;
    }

    
  };
  
  if (!mounted) {
    return null;
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={isSignUp}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoogleSignIn}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isSignUp ? 'Sign Up with Google' : 'Login with Google'}
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;