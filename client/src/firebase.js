import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbPfxb9WHvag2T2Q1svoMVAYqqY74ecNU",
    authDomain: "password-manager-e738c.firebaseapp.com",
    databaseURL: "https://password-manager-e738c-default-rtdb.firebaseio.com",
    projectId: "password-manager-e738c",
    storageBucket: "password-manager-e738c.appspot.com",
    messagingSenderId: "992983353719",
    appId: "1:992983353719:web:4b96ba80ba44f9366b7972",
    measurementId: "G-EQEDQWMDB0"
  };



firebase.initializeApp(firebaseConfig);

export default firebase