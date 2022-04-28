const express = require('express');
const axios = require('axios');
const https = require('https');

const letterboxRoutes = express.Router();

letterboxRoutes.route("/auth").get(async function (req, res) {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Accept": "application/json"
  //   },
  //   params: {
  //     username: "MaldingmonkE"
  //   }
  // };

  // const data = {
  //   "grant_type": "password",
  //   "username": "MaldingmonkE",
  //   "password": "Dacnom-6nyhti-vujsam"
  // };
  const data = {
    "username": "MaldingmonkE"
  };
  // await axios.post("https://api.letterboxd.com/api/v0/auth/token", data, config)
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
  await axios.get("https://api.letterboxd.com/api/v0/auth/username-check", data)
    .then(res => console.log(res))
    .catch(err => console.log(err));

  // https.get('https://api.letterboxd.com/api/v0/auth/username-check?username=hihi', (res) => {
  //   console.log('statusCode:', res.statusCode);
  //   console.log('headers:', res.headers);

  //   res.on('data', (d) => {
  //     process.stdout.write(d);
  //   });

  // }).on('error', (e) => {
  //   console.error(e);
  // });
});



module.exports = letterboxRoutes;