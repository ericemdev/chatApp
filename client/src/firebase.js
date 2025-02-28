import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAgQnBhGI3XsR0rfktaNJPaImeLhgPYh5w",
  authDomain: "fir-703f5.firebaseapp.com",
  projectId: "fir-703f5",
  storageBucket: "fir-703f5.firebasestorage.app",
  messagingSenderId: "1001497186812",
  appId: "1:1001497186812:web:90d36340813d9f0a0d6279",
  measurementId: "G-6J7XGS24TH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

// Export the necessary modules
export { auth, db, }