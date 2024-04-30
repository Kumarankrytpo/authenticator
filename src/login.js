import './App.css'
import React, { useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [login_ren,setRenderer] = useState(true);
  const[newUserName,setUserName] = useState("");
  const[newEmailId,setnewEmailId] = useState("");
  const[newPassword,setnewPassword] = useState("");
  const[newConfirmPassword,setnewConfirmPassword] = useState("");
  const[inputStyleClas,setinputStyleClas] = useState("");
  const[username,setLoginUserName] = useState("");
  const[password,setLoginPassword] = useState("");

  const validateLogin = () =>{
    let rtnflag=true;
      if(username===undefined || username===isNaN || username.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(password===undefined || password===isNaN || password.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(rtnflag){
        console.log("Inside login validation");
        fetch("http://localhost:8080/webapi/auth/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body : JSON.stringify({
            username : username,
            password : password
          }),
        }).then((response) => {
          console.log("FIRST RESP >>>"+response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          console.log("response>>>"+data);
          if(data.status!== undefined && data.status==="success"){
            console.log(":inside account not exsist");
            toast.success('Login Successful');
          }else{
            console.log(":inside account not exsist");
            toast.error('Account Not Exists.');
          }
        }).catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
      
  } 

  const onInputChange = (event) =>{
    if(login_ren){
      if(event.target.name==='loginusername'){
        setinputStyleClas("");
        setLoginUserName(event.target.value);
      }else if(event.target.name==='loginpassword'){
        setinputStyleClas("");
        setLoginPassword(event.target.value);
      }
    }else{
if(event.target.name==='username'){
      setinputStyleClas("");
      setUserName(event.target.value);
    }else if(event.target.name==='emailid'){
      setinputStyleClas("");
      setnewEmailId(event.target.value);
    }else if(event.target.name==='password'){
      setinputStyleClas("");
      setnewPassword(event.target.value);
    }else if(event.target.name==='cpassword'){
      setinputStyleClas("");
      setnewConfirmPassword(event.target.value);
    }
    }
  }
  
  var tabChange = (event) =>{
    if(event.target.name === 'signupBtn'){
      setRenderer(false);
      setinputStyleClas("");
      setUserName("");
      setnewEmailId("");
      setnewPassword("");
      setnewConfirmPassword("");
    }else{
      setRenderer(true);
      setLoginUserName("");
      setLoginPassword("");
    }
    
  }
 
  var validateSignup = ()=>{
      let rtnflag=true;
      if(newUserName===undefined || newUserName===isNaN || newUserName.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(newEmailId===undefined || newEmailId===isNaN || newEmailId.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(newPassword===undefined || newPassword===isNaN || newPassword.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(newConfirmPassword===undefined || newConfirmPassword===isNaN || newConfirmPassword.length===0){
        setinputStyleClas("wrong_inputField");
        rtnflag=false;
      }
      if(rtnflag){
        fetch("http://localhost:8080/webapi/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: newUserName,
            emailid: newEmailId,
            password: newPassword,
            cpassword: newConfirmPassword,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response:", data.status);
            if(data.status!==undefined){
              if(data.status==="existing user"){
                console.log(":inside account not exsist");
            toast.error('Account Already Exists');
              }else{
                console.log(":inside account not exsist");
            toast.success('Account Created');
              }
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      }
  }
  
  return (
    <div><ToastContainer position="top-right" reverseOrder={false}/>
    <div class="center">
      
      <button name='loginBtn' class="header_button_login" onClick={tabChange}>LOGIN</button>
      <button name='signupBtn' class="header_button_signup" onClick={tabChange}>SIGNUP</button>
      {login_ren && (
      <div>   
      <p>User Name</p>
      <input type="text" placeholder="username" name='loginusername' value={username} class={inputStyleClas} onChange={onInputChange}></input>
      <p>Password</p>
      <input type="password" placeholder="password" name='loginpassword' value={password} class={inputStyleClas} onChange={onInputChange}></input>
      <br />
      <br />
      <button type="submit" onClick={validateLogin} >Login</button>
      </div>)} 
      {!login_ren && (
      <div>
      <p>User Name</p>
      <input type="text" name='username' class={inputStyleClas} placeholder="username" value={newUserName} onChange={onInputChange}></input>
      <p>Email Id</p>
      <input type="Text" name='emailid' class={inputStyleClas} placeholder="Email Id" value={newEmailId} onChange={onInputChange}></input>
      <p>Password</p>
      <input type="password" name='password' class={inputStyleClas} placeholder="password" value={newPassword} onChange={onInputChange}></input>
      <p>Confirm Password</p>
      <input type="password" name='cpassword' class={inputStyleClas} placeholder="password" value={newConfirmPassword} onChange={onInputChange}></input>
      <br />
      <br />
      <button type="submit" onClick={validateSignup}>Signup</button>
      </div>)} 
    </div>
    </div>
  );
}

export default Login;
