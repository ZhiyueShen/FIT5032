// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqoSP91kZzXH0UFfpFpMgScc0QtRUkOT0",
  authDomain: "fit5032-zhiyue.firebaseapp.com",
  projectId: "fit5032-zhiyue",
  storageBucket: "fit5032-zhiyue.firebasestorage.app",
  messagingSenderId: "350448043205",
  appId: "1:350448043205:web:0eaa261be846d255bc9cac"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export Firestore instance
const db = getFirestore();
export default db;