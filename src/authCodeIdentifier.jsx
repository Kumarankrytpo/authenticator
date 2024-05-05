import { useState ,useEffect , useRef} from "react";
import {useLocation} from 'react-router-dom';
import './authcode.css';
import Timer from './timer'


function AuthCodeIdentifier(){

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const uid = params.get('uid');

    const[authcode,setAuthCode] = useState("");
    const[userid,setuserid] = useState("");
    const apiCalled = useRef(false);
    useEffect(() => {
        console.log("user id"+uid);
        setuserid(uid);
        if (userid && !apiCalled.current) {
            fetch("http://localhost:8080/webapi/auth/getauthcode",{ 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body : JSON.stringify({
              userid : userid
            }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then((data)=>{
            const respData = JSON.parse(JSON.stringify(data));
            setAuthCode(respData.authcode);
          }).catch((e)=>{
            console.log("Error in API",e);
        })
        apiCalled.current = true;
        }
         
       },[uid,userid]);
    console.log("inside identifies "+authcode);
    return(
        <div>
            <div class="auth_container">
            <h1 style={{color:"white"}}>{authcode}</h1>
            <div  class="timer_container">
            <Timer/>
            </div>
            
            </div>
        </div>
    )
}

export default AuthCodeIdentifier;