import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCookies} from "react-cookie";

const UserProfile = () => {
    const [cookies,setCookie,removeCookie] = useCookies('TOKEN');
    console.log(cookies,setCookie);
    const url = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        const id = url.pathname.slice(9);
        axios.put(`https://gpa-calculatorapp.herokuapp.com/api/login/${id}`).then(res => setUser(res.data)).catch(err => console.log(err));
    }, [url.pathname]);

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(`Copied your result page url.If you want to share please paste:${str}`)
    }

    const logOut =()=>{
        removeCookie('TOKEN');
        // document.cookie = "TOKEN=;expires=Sun,20 Mar 1979 12:00:00 UTC;"
        window.location.reload();
        console.log("log out . . .");
    }

    const deleteUser=(id)=>{
        axios.delete(`https://gpa-calculatorapp.herokuapp.com/api/login/${id}`).then(res=>console.log("succesfully deleting operation")).catch(err=>console.log(err))
        removeCookie("TOKEN");
        window.location.reload();
    }
    
    return (
        <div className="profile">
            {
                user !== {} ?
                    (
                        <div className="userProfile">
                            <div className="mb-5 d-flex" >
                                <p className="mb-3 profilename">{user.username}</p>
                            </div>
                            <a className="btn mt-2 profileButton" href={`/result/${user._id}`}>MyResults</a>
                            <button className="btn profileButton" onClick={() => copyToClipboard(`https://gpa-calculatorapp.herokuapp.com/result/${user._id}`)} >Share Your Results</button>
                            <button className="btn profileButton" onClick={()=>deleteUser(user._id)} >Delete Your Profile</button>
                            <button className="btn profileButton" onClick={() => logOut() }>Log Out</button>
                        </div>)
                    : (<div>
                        <h2>
                            Please <a href="/login">log in</a>
                        </h2>
                    </div>)}
        </div>
    )
}

export default UserProfile;