// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeyvF-Tsus8t4m6MoMFf7EUZ6_BUFRvpk",
  authDomain: "e-shopproject-a90c1.firebaseapp.com",
  projectId: "e-shopproject-a90c1",
  storageBucket: "e-shopproject-a90c1.appspot.com",
  messagingSenderId: "158312944134",
  appId: "1:158312944134:web:45ea14eb5760faccd86987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDB = getFirestore(app);

export {fireDB,auth};

