// Import packages
const express = require("express");
const morgan = require("morgan");
let bodyParser = require("body-parser");
const app = express();
const port = 8000;

const dotenv = require("dotenv");
dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;

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
// const connectionString = `mongodb://kaisingmacbook.local:27017/collab-api`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

var db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", connectionString);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});
