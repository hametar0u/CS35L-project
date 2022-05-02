const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const MALRoutes = express.Router();

MALRoutes.route("/auth/get-code-verifier").get((req, res) => {
  res.send({code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20"});
});

MALRoutes.route("/auth").post(async (req, res) => {
  const code_challenge = req.body.code_challenge;
  // console.log("verifier in auth: ", req.body.code_challenge);
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&code_challenge_method=plain&state=RequestID42`;
  res.send({ url });
});

MALRoutes.route("/auth/token").post(async (req, res, next) => {
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
  });

  const url = `https://myanimelist.net/v1/oauth2/token`;

  await axios.post(url, params)
    .then(response => { //TODO: save tokens in session
      const json = response.data;
      console.log(json);
      res.redirect(307, `/get-user?Authorization=${json.access_token}`);
    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        res.status(400).send(err.response.data.hint); //this will either be invalid code, expired code, or invalid refresh token
      }
      else{
        next(err); //failsafe
      }
    });
});


MALRoutes.route("/auth/refresh-token").post(async (req, res, next) => {
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
  });

  const url = `https://myanimelist.net/v1/oauth2/token`;

  await axios.post(url, params)
    .then(response => {
      const json = response.data;
      console.log(json);
      res.status(200).send(json);
    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        res.status(400).send(err.response.data.hint); //this will either be invalid code, expired code, or invalid refresh token
      }
      else{
        next(err); //failsafe
      }
    });
});



MALRoutes.route("/get-user").post(async (req, res) => {
  const urlParams = new URLSearchParams(req._parsedUrl.search);
  const access_token = urlParams.get("Authorization");
  const url = 'https://api.myanimelist.net/v2/users/@me';
  const config = {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  };

  const response = await axios.get(url, config);
  const json = await response.data;
  console.log(json);
  res.send(json);
  
});

//REDIRECT TESTING
MALRoutes.route("/redirect").post((req, res) => {
  const urlParams = new URLSearchParams(req._parsedUrl.search);
  const access_token = urlParams.get("Authorization");
  console.log(access_token);
  res.redirect(307, "/redirect2");
});

MALRoutes.route("/redirect2").post((req, res) => {
  res.status(200).send("you did it");
});

module.exports = MALRoutes;