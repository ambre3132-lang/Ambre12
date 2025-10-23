// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsOdFdD9Tj3_7oFC3poyfO-8sOk5d6COE",
  authDomain: "ambre-ec987.firebaseapp.com",
  projectId: "ambre-ec987",
  storageBucket: "ambre-ec987.firebasestorage.app",
  messagingSenderId: "951272911775",
  appId: "1:951272911775:web:269a9e74631da3e19f03aa",
  measurementId: "G-YG9RQH47YB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
