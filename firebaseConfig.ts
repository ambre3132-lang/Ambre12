// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrDUVQmmrFt9ruKu3jkC3dK4j2dX2UStU",
  authDomain: "ambre1.firebaseapp.com",
  projectId: "ambre1",
  storageBucket: "ambre1.firebasestorage.app",
  messagingSenderId: "493636474921",
  appId: "1:493636474921:web:86e3349154abfee11ae438",
  measurementId: "G-YJZR99BH8P"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics();

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();