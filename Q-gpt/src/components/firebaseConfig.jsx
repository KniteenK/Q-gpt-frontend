import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import admin from 'firebase/admin';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-YvW4NryZLybFDsk4BKjYCe0CzxPY4nM",
  authDomain: "q-gpt-b4905.firebaseapp.com",
  projectId: "q-gpt-b4905",
  storageBucket: "q-gpt-b4905.appspot.com",
  messagingSenderId: "705771384969",
  appId: "1:705771384969:web:66948ce3aac92c0cdb5658"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
