const express = require("express");
const Router = express.Router();
const User = require("./userModels");
const bcrypt = require("bcrypt");
const getToken = require("./token");
const jwt = require("jsonwebtoken");

Router.get("/", async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

Router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const oldUser = await User.findOne({ username: username });
    if (oldUser !== null) {
        const match = await bcrypt.compareSync(password, oldUser.password);
        console.log("Log in . . .");
        match === true ? res.send(getToken(oldUser)) : res.status(404).send("something went wrong");
    }
    else {
        const data = {
            username: username,
            result: [],
            password: await bcrypt.hash(password, 10)
        }
        const newUser = new User(data);
        const devUser = await newUser.save();
        const token = getToken(devUser);
        res.send(token);
        }
    })

Router.put("/:id",async(req,res)=>{
    const user = await  User.findOne({_id:req.params.id});
    res.send(user);
})




module.exports = Router;