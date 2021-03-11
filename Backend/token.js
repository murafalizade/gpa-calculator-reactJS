const jwt = require("jsonwebtoken");
const getToken = (user) => {
    const token = jwt.sign({
        id:user._id,
        username: user.username,
        password: user.password
    }, "supersecret", {
        expiresIn: "1h"
    })
    return token;
}

module.exports = getToken;