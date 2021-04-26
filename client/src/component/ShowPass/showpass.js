import react, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'firebase/auth';
// const db=firebase.firestore().collection('manager');
import firebase from '../../firebase';
import Mainpage from '../MainPage/mainpage';

const {encrypt,decrypt} = require('../WebsitePassForm/Encryption');
const main = require('../MainPage/mainpage')


export default function ShowPass() {



    const [passList,setPasslist] = useState([]);




    function onsubmit(){
            console.log("Mainpage data ")
            try{
           
                const manager_ref=firebase.firestore().collection('manager');
                 console.log(firebase.auth().currentUser.email);
                 const passwordref = manager_ref.where("user","==",firebase.auth().currentUser.email);
     
    
                 passwordref.get().then((querySnapshot) =>{
                     querySnapshot.forEach((doc) => {
                         
                         var pass = doc.data().password;

                         var decryption_material = {
                            password: doc.data().password.toString(),
                            iv: doc.data().iv,
                         }


                         var passInfo = {
                            website: doc.data().website,
                            password: decrypt(decryption_material),
                        }

                         setPasslist(passList => [ ...passList, passInfo ]);
                     })
                 })
                 
             }
             catch (e){
                 console.log(e);
             }
       
    }


    return (
          <div className="" onLoad={onsubmit}>
              <button onClick={onsubmit}>Show</button>
            <h1 className="">These are my passwords</h1>
            <table>
                <tbody>
            {passList.map((val,i)=>{
                    return <tr className="p" key={i}>
                            <td>{val.website}</td>
                            <td>{val.password}</td>                        
                            </tr>
                })} 
                </tbody>
            </table>
                 
  </div>

      );
}

