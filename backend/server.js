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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//DB
let mongoose = require("mongoose");
// const url = `mongodb://kaisingmacbook.local:27017/collab-api`;
const url=`mongodb+srv://kaisinguser1:${PASS}>@kaising1-aya62.mongodb.net/collab-api`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
