const mongoose = require("mongoose");
const shortid = require("shortid");

const dbUrl = "mongodb+srv://newuser:murad1979@nosql.8m48y.mongodb.net/gpa-calculator-db?retryWrites=true&w=majority"

try {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log("Connect is succesfull")
}
catch {
    console.log("Connect is failed");
}


const User = mongoose.model('GPAuser',new mongoose.Schema({
    _id:{type:String,default:shortid},
    username:String,
    password: String,
    result:[]
}));
module.exports = User;