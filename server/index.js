const express  =require("express");
const cors = require('cors');
const {encrypt,decrypt} = require('./Encryption');

const app = express();
const PORT = 3001


app.use(cors());
app.use(express.json());
const firebase = require('firebase');
app.use('/img', express.static(__dirname + '/Images'));

const firebase_app = firebase.initializeApp({
    apiKey: "AIzaSyBbPfxb9WHvag2T2Q1svoMVAYqqY74ecNU",
    authDomain: "password-manager-e738c.firebaseapp.com",
    databaseURL: "https://password-manager-e738c-default-rtdb.firebaseio.com",
    projectId: "password-manager-e738c",
    storageBucket: "password-manager-e738c.appspot.com",
    messagingSenderId: "992983353719",
    appId: "1:992983353719:web:4b96ba80ba44f9366b7972",
    measurementId: "G-EQEDQWMDB0"
});


console.log("every thing ok");

const db=firebase_app.firestore().collection('manager');

app.post("/addpassword", (req,res) => {
    const { password, title, email} = req.body;
    const hashedpassword = encrypt(password);
    try{
        db.add({
            password: hashedpassword.password,
            website: title,
            user: email,
            iv: hashedpassword.iv,
        });
        console.log("Sucessfully added ",password," for ",title);
    }
    catch (e){
        console.log(e);
    }
});


app.get('/',(req,res) => {
    res.send("Hello world");
})

/* TODO */

app.get('/showpasswords', (req,res) => {
    
    // try{
    //     const messageRef=firebase.firestore().collection('messages');
    //     console.log(firebase.auth().currentUser.email);
    //     const password = messageRef.orderBy("time").where("user","==",firebase.auth().currentUser.email);
    // }
    // catch (e){
    //     console.log(firebase.auth().currentUser)
    // }
    // // console.log(password);
    console.log(req)
    console.log("----------------------------------------------------------------------------");
    
})
app.listen(PORT, () => {
    console.log("Server is running");
})