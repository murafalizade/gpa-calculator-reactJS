const express = require("express");
const Router = express.Router();
const User = require("./userModels");

Router.get("/:id",async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user.result);
});

Router.post(`/:id`, async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    const result = req.body;
    user.result.push(result);
    await user.save();
    res.send({msg:"succes"});
    console.log('succcess');
});

Router.delete(`/:id/result/:prid`, async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    const id = req.params.prid;
    let filtering = user.result;
    const newResult = filtering.filter((value)=>{
        return value.id !== id;
    });
    user.result = newResult;
    await user.save();
    res.send(user.result);
});

module.exports = Router;