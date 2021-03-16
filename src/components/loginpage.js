import React,{useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [showing,setShowing] = useState("SHOW");

    const formSubmit = async (user) =>{
        if(user.username!="" && user.password!=""){
            let token = await axios.post(`http://localhost:8080/api/login`, user);
            document.cookie = `TOKEN=${token.data};max-age=60*60*24;`;
            window.location.reload();
        }
        else{
            alert("Please enter your username or password");
        }
    }

    return (
        !document.cookie?
        <div className="login">
            <p className="pfor">Welcome user,please log in  for save your results or look at your recent saved results</p>
            <input placeholder="USERNAME" onChange={(e)=>setUser({...user,username:e.target.value})} value={user.username} type="name" />
            <input placeholder="PASSWORD" 
                value={user.password} 
                onChange={(e)=>setUser({...user,password:e.target.value})} 
                type={showing==="HIDDEN"?"text":"password"} />
            <span onClick={()=>setShowing(showing==="SHOW"?"HIDDEN":"SHOW")} id="show">{user.password?showing:""}</span>
            <button onClick={()=>formSubmit(user)} className="btn sumbbuton btn-outline-primary">Login</button>
            </div> : <Redirect to="/" />
    )
}
export default LoginPage;