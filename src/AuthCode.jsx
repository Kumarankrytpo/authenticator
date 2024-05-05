import './authcode.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {useEffect , useRef} from 'react';


function AuthCode(props){
    const {state} = useLocation();
    const userData = JSON.parse(JSON.stringify((state)));
    const apiCalled = useRef(false);
        
        useEffect(()=>{
            if (userData.userid && !apiCalled.current) {
                fetch("http://localhost:8080/webapi/auth/authCodeIntiation",{ 
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body : JSON.stringify({
                  userid : userData.userid,
                  emailid : userData.emailid
                }),
              }).then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              }).catch((e)=>{
                console.log("Error in API",e);
            })
            apiCalled.current = true;
            }
            console.log("INSIDE AUTH CODE TAB ");    
        },[userData.userid,userData.emailid]);
    
    const validate = ()=>{
         
    }

    return(
        <div>
          <div class="auth_container">
            <h1>Authenticator Code</h1>
            <input type='text'></input>
            <br></br>
            <button type='submit' onClick={validate}>Ok</button>
          </div>
        </div>
    );
}

export default AuthCode;