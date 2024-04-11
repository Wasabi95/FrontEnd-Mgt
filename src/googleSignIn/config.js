//components/config.js
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

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
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};


