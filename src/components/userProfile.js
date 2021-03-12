import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const url = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        const id = url.pathname.slice(9);
        axios.put(`http://localhost:8080/api/login/${id}`).then(res => setUser(res.data)).catch(err => console.log(err));
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
        document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        console.log("log out . . .");
        window.location.reload();
    }
    console.log(user);
    return (
        <div className="profile">
            {
                user !== {} ?
                    (
                        <div className="userProfile">
                            <div className="mb-5 d-flex" >
                                <div className="profileFoto"></div>
                                <p className="mb-3 profilename">{user.username}</p>
                            </div>
                            <a className="btn mt-2 profileButton" href={`/result/${user._id}`}>MyResults</a>
                            <button className="btn profileButton" onClick={() => copyToClipboard(`http://localhost:5000/result/${user._id}`)} >Share Your Results</button>
                            <button className="btn profileButton" >Delete Your Profile</button>
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