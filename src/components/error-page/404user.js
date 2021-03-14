import React from "react";
const NotUser = () => {
    return (
        <div style={{zIndex:"-1"}}>
            <h4 className="text-white text-center m-4">
                Not found as user , please  <a href="/login">sign in</a> for this profile 
            </h4>
        </div>
    )
}

export default NotUser;