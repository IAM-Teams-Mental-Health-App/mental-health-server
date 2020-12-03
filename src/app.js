require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require('morgan');
// locals
const UserRouter = require("./Users/user-routes");

// set up instance of server
const server = express();
// use middlware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

// custom routes here
server.use("/user", UserRouter);

// generic welcome
server.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to IAM-Teams-FALL-2020 Mental Health App" });
});

// error
server.use((req,res) => {
  // console.log("FROM app.js", err);
  return res.status(500).json({ message: "From App: Something Went Wrong" });
});

module.exports = server;