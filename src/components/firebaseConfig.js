
// eslint-disable-next-line 
//components/firebase.js
// Import the functions you need from the SDKs you need
// react icon Fcgoogle
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Now you can use the 'auth' object for authentication

const firebaseConfig = {
  apiKey: "AIzaSyAcxiGNHYmSx7bPuk1jeSNYZeH_qgKEgz8",
  authDomain: "auth-1a1fd.firebaseapp.com",
  projectId: "auth-1a1fd",
  storageBucket: "auth-1a1fd.appspot.com",
  messagingSenderId: "255827962163",
  appId: "1:255827962163:web:ba58e62dd472c60c083646",
  measurementId: "G-234RFJXQCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const firebaseAuth = getAuth(app);




// const firebaseConfig = {
//   apiKey: "AIzaSyAcxiGNHYmSx7bPuk1jeSNYZeH_qgKEgz8",
//   authDomain: "auth-1a1fd.firebaseapp.com",
//   projectId: "auth-1a1fd",
//   storageBucket: "auth-1a1fd.appspot.com",
//   messagingSenderId: "255827962163",
//   appId: "1:255827962163:web:ba58e62dd472c60c083646",
//   measurementId: "G-234RFJXQCJ"
// };