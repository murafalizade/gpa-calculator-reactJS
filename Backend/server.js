const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port =  8080;
const app = express();
const LoginRouter = require("./loginRouter");
const ResultRouter = require("./resultRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.use(favicon('../Client/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../Client/build')));

app.use("/api/login", LoginRouter);
app.use("/api/users", ResultRouter);

app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../Client/build', 'index.html'));
});

// app.use((req, res) => {
//   res.status(404).json({
//     mesaj: 'Rota Bulunamadı'
//   });
// });
// app.use((err, req, res) => {
//   res.status(err.status || 500).json({
//     mesaj: 'hata mesajı',
//     hata: {}
//   });
//});

app.listen(port,()=>{console.log('http://localhost:8080')});