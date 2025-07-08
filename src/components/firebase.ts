// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get } from "http";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCWUiEc6wDHjXyd1sMFLZcQlD2-mZ0Nqo",
  authDomain: "hoseholdtypescript-567e2.firebaseapp.com",
  projectId: "hoseholdtypescript-567e2",
  storageBucket: "hoseholdtypescript-567e2.firebasestorage.app",
  messagingSenderId: "65023842467",
  appId: "1:65023842467:web:3c8279a9b0e7151f4f4716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);

export { db };