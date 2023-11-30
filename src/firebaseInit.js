// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByBUh9H0aihNNiLhaumpBzfrAr_cHE9BU",
  authDomain: "photofolio-705f6.firebaseapp.com",
  projectId: "photofolio-705f6",
  storageBucket: "photofolio-705f6.appspot.com",
  messagingSenderId: "729226693175",
  appId: "1:729226693175:web:a8cb223db50264ecdd0db2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default  db;