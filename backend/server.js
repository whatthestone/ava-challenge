// Import packages
const express = require("express");
const morgan = require("morgan");

//Mongo DB
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@<your-cluster-url>/test?retryWrites=true&w=majority`;

// App
const app = express();
// Morgan
app.use(morgan("tiny"));

//allow cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// Starting server
app.listen("8000");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));

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
