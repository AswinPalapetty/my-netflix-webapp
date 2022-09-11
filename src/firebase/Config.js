// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2csHz1xg6gxsqRqdbif0ky0GbbRkAxTo",
  authDomain: "netflix-e0492.firebaseapp.com",
  projectId: "netflix-e0492",
  storageBucket: "netflix-e0492.appspot.com",
  messagingSenderId: "949417085833",
  appId: "1:949417085833:web:79ae2ac441b7575aefef58"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);