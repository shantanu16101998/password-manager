import Axios from 'axios';
import { useState, useEffect } from 'react';
import './websitepassform.css';
import 'firebase/auth';
import firebase from "../../firebase"
const {encrypt,decrypt} = require('./Encryption');
const manager_ref=firebase.firestore().collection('manager');
function PassForm() {


  const [password,setpassword] = useState('');
  const [title,settitle] = useState('');
  const [passwordList,setPasswordList] = useState([])
  const [passList,setPasslist] = useState([]);
  
  useEffect(()=>{
    Axios.get('http://localhost:3001/showpasswords').then((response)=>{
    setPasswordList(response.data)
    })
  },[]);

const [status,setStatus]=useState(0);
 


const addPassword = () => {
  
  
      
    const hashedpassword = encrypt(password);
    manager_ref.add({
      password:hashedpassword.password,
      user:firebase.auth().currentUser.email,
      website:title,
      iv:hashedpassword.iv,
    });
    alert("password added successfully " + hashedpassword);
  // Axios.post('http://localhost:3001/addpassword', {password: password, title: title, email:firebase.auth().currentUser.email});
 };

 
 function fun(){
  if(title=="" || password==""){
    alert("any field cant be empty");
    return;
  }
  const manager=firebase.firestore().collection('manager');
    var passwordr = manager.where("user","==",firebase.auth().currentUser.email).where("website","==",title);
    
    passwordr.get().then((querySnapshot) =>{
      querySnapshot.forEach((doc) => {
      setStatus(100);
      alert("Duplicate Entry is not allowed before if condition");
      console.log(status);
      return;
      });
    });
    addPassword();
  
  }

 
 function onlogout(){
  firebase.auth().signOut().then(() => {
    window.location.replace('/');
  }).catch((error) => {
    // An error happened.
  });
  // window.location.replace('/');
}



function showMyPass(){
  
  try{
    
      const manager_ref=firebase.firestore().collection('manager');
       console.log(firebase.auth().currentUser.email);
       const passwordref = manager_ref.where("user","==",firebase.auth().currentUser.email);


       passwordref.get().then((querySnapshot) =>{
           querySnapshot.forEach((doc) => {

               var decryption_material = {
                  password: doc.data().password.toString(),
                  iv: doc.data().iv,
               }


               var passInfo = {
                  website: doc.data().website,
                  password: decrypt(decryption_material),
              }
              console.log(passInfo)
               setPasslist(passList => [ ...passList, passInfo ]);
           })
       })
       
       document.getElementById("password_button").remove();
   }
   catch (e){
       console.log(e);
   }

}

const [passworrd,setP]=useState('');
const [searchTitle,setSearchTitle]=useState('');
const [searchObjectitle,setObject]=useState('');


function search(){
  try{
    setObject(null);
    const manager=firebase.firestore().collection('manager');
    // manager.
    const passwordr = manager.where("user","==",firebase.auth().currentUser.email).where("website","==",searchTitle);
  
    passwordr.get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
     
        setObject(doc.data());
  
        });
      });
       if(searchObjectitle!==null){
         alert("object found : "+searchObjectitle.website);
         var object={
           password:searchObjectitle.password,
           iv:searchObjectitle.iv,
          };
         setP(decrypt(object));
       }
       else{
         setP("");
        alert("Entry not found");
       }
    }
    catch(e){
      alert(e);
      console.log(e);
    }
}

const [updatedPassword,setU]=useState('');

function update(searchTitles,updates){
  
  try{
    const manager=firebase.firestore().collection('manager');
    // manager.
    var passwordr = manager.where("user","==",firebase.auth().currentUser.email).where("website","==",title);
    var count=0;
    passwordr.get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
        count=count+1;
        doc.ref.delete();
        });
      });
       if(count==0){
         alert("entry not found");
       }
       else{
       addPassword();
       }
    }
    catch(e){
      alert(e);
      console.log(e);
      
    } 
  
}
const [searchTitle1,setSearchTitle1]=useState('');
function del(){
  try{
  const manager=firebase.firestore().collection('manager');
  // manager.
  const passwordr = manager.where("user","==",firebase.auth().currentUser.email).where("website","==",searchTitle1);

  passwordr.get().then((querySnapshot) =>{
      querySnapshot.forEach((doc) => {
   
      doc.ref.delete();

      });
    });
     alert("Entry deleted successfully");
  }
  catch(e){
    alert(e);
    console.log(e);
    
  }
}





function copy_password(id){
  var text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  alert("Succesfully copied to clipboard");
}








return <div className="Appy">
    <div className="login-box AddingPassword">
    {/* kuch pta lga kya dkkt h? */}
    {/* na yr query del aur search dono m same hai fir bhi search wala kaam nhi kr rha  */}
      <div className="col-lg-12 login-title">
        ENTER YOUR PASSWORD
                </div>
      <br></br>





        <div className="form-group">
        <label className="form-control-label">PASSWORD</label>
        <br></br>
        <input type="text" id="password" placeholder="Example pass123" onChange={(event) => { setpassword(event.target.value);setU(event.target.value);}}/>
          </div>    
        


        <div className="form-group">
        <label className="form-control-label">WEBSITE</label>
        <br></br> 
      <input type="text" id="website" placeholder="Example www.facebook.com" onChange={(event) => { settitle(event.target.value);setSearchTitle1(event.target.value);}} />
      </div>
      <br></br>
      
  
      <button onClick={fun}>Add Password </button>
      
      <button onClick={del}>Delete Entry </button>
      
      <button onClick={update}>Update Entry </button>
      
      <button onClick={onlogout}>Signout </button>
      <br></br>
      {/* <button onClick={showCurrentUser}>Who are you!</button> */}
      <br></br>
      <div className="user-box">
      <label className="form-control-label">Enter the website</label>
      <br></br>
      <input type="text" id="new" placeholder="Website to Search for Password" onChange={(event) => { setSearchTitle(event.target.value)}} />
      </div>
      <button onClick={search}>Search </button>
  
      <div className="col-lg-12 login-title">
      Your Password is : {passworrd}
                </div>

      <button onClick={showMyPass} id="password_button">Show all passwords</button>


            </div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

            <table class="table table-striped">
            <thead class="thead-dark">
    <tr>

      <th scope="col">Website</th>
      <th scope="col">Password</th>
      <th scope="col">Copy this password</th>
    </tr>
  </thead>
  <tbody>
              {passList.map((val,i)=>{

                      return <tr>
                        <th scope="row" key="{i}"><p>{val.website}</p></th>
                        <td id={i}><p>{val.password}</p></td>
                        <td><button className="copy_button" onClick={() => {copy_password(i)}}>Copy</button></td>
                          </tr>
                  
                })} 
                </tbody>
              </table>


            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
        </div>
}

export default PassForm;