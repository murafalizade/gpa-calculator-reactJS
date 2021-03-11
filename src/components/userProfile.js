import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
const token = document.cookie.slice(6);

console.log(token);
const UserProfile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (document.cookie) {
            const user = jwt(token);
            setUser(user);
        }
    }, []);

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    return (
        <div className="profile">
            {
                token !== "" ?
                    (
                        <div className="userProfile">
                            <div className="mb-5 d-flex" >
                                <div className="profileFoto"></div>
                                <p className="mb-3 profilename">{user.username}</p>
                            </div>
                            <a className="btn mt-2 profileButton" href="/result">MyResults</a>
                            <button className="btn profileButton" onClick={() => copyToClipboard(`http://localhost:5000/Result/${user.id}`)} >Share Your Results</button>
                            <button className="btn profileButton" >Delete Your Profile</button>
                            <button className="btn profileButton" onClick={() => document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"}>Log Out</button>
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