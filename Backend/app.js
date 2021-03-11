const express =  require("express");
const app = express();
const LoginRouter = require("./loginRouter");
const ResultRouter = require("./resultRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use("/login", LoginRouter);
app.use("/users", ResultRouter);


app.listen(3030,()=>{
    console.log("api was working");
})