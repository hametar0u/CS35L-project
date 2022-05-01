const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const MALRoutes = express.Router();

MALRoutes.route("/auth").post(async (req, res) => {
  const code_challenge = req.body.code_challenge.trim();
  console.log("verifier in auth: ", req.body.code_challenge);
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&code_challenge_method=plain&state=RequestID42`;
  res.send({ url });
});

MALRoutes.route("/auth/token").post(async (req, res) => {
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
    
  });

  console.log("verifier in auth token: ", req.body.code_verifier);
  
  const url = `https://myanimelist.net/v1/oauth2/token`;
  const response = await axios.post(url, params)
    .then(response => {
      // Work with the response...
      const json = response.data;
      console.log(json);
      res.send(json);
    }).catch(err => {
      // Handle error
      console.log(err);

    });
});

MALRoutes.route("/get-user").post(async (req, res) => {
  // console.log(req.body);
  const url = 'https://api.myanimelist.net/v2/users/@me';
  const config = {
    headers: {
      Authorization: 'Bearer ' + req.body.access_token
    }
  };

  const response = await axios.get(url, config);
  const json = await response.data;
  console.log(json);
  res.send(json);
  
});

module.exports = MALRoutes;