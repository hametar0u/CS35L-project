const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const UserTest = express.Router();

UserTest.route("/usertest").get((req, res) => {
  console.log("i got here");
});

module.exports = UserTest;
