const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const LoginRouter = require("./loginRouter");
const ResultRouter = require("./resultRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use("/api/login", LoginRouter);
app.use("/api/users", ResultRouter);


app.use(favicon('build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port);