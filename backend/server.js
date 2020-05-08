// Import packages
const express = require("express");
const morgan = require("morgan");
let bodyParser = require("body-parser");
const app = express();
const port = 8000;
const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASS;
// Starting server
app.listen(port, () => {
  console.log("Listening on port " + port);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Basic MongoDB
// const MongoClient = require("mongodb").MongoClient;
// const dbpath = `mongodb+srv://${USER}:${PASS}@@kaising1-aya62.mongodb.net/test?retryWrites=true&w=majority`;
// MongoClient.connect(
//   dbpath,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) return console.error(err);
//     console.log("Connected to Database");
//   }
// );

//DB
let mongoose = require("mongoose");
const url = `mongodb://kaisingmacbook.local:27017/collab-api`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
// db.once("open", (_) => {
//   console.log("Database connected:", url);
// });
// db.on("error", (err) => {
//   console.error("connection error:", err);
// });

//allow cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// const WebSocket = require('ws');
//
// const wss = new WebSocket.Server({ port: 3030 });
//
// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });
