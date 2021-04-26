import React, { useState, useEffect } from "react";
import 'firebase/auth'
import './mainpage.css';
import firebase from "../../firebase";



// firebase.initializeApp({
//     apiKey: "AIzaSyBbPfxb9WHvag2T2Q1svoMVAYqqY74ecNU",
//     authDomain: "password-manager-e738c.firebaseapp.com",
//     databaseURL: "https://password-manager-e738c-default-rtdb.firebaseio.com",
//     projectId: "password-manager-e738c",
//     storageBucket: "password-manager-e738c.appspot.com",
//     messagingSenderId: "992983353719",
//     appId: "1:992983353719:web:4b96ba80ba44f9366b7972",
//     measurementId: "G-EQEDQWMDB0"
// });




export default function Mainpage() {
    
  const [Users, setUsers] = useState('');

    
    function onsubmit(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          setUsers(firebase.auth().currentUser.email)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            window.location.replace('/form');
            
          } else {
          }
        });


        
    }

  


  return (
    <div className="joinOuterContainer" style={{ 
      // backgroundImage: `url("lock.jpg")` 
    }}>
      <div className="joinInnerContainer">
        <h1 className="heading">Password Manager</h1>
        <button className={'button mt-20'} onClick={onsubmit} type="submit">Sign In</button>
      </div>
    </div>
  );
}

