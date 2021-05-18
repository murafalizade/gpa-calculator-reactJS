const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port =  8080;
const app = express();
const LoginRouter = require("./loginRouter");
const ResultRouter = require("./resultRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors())

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