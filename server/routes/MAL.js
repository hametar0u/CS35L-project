const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const MALRoutes = express.Router();

MALRoutes.route("/auth").post(async (req, res) => {
  const code_challenge = req.body.code_challenge.trim();
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&code_challenge_method=plain&state=RequestID42`;
  res.send({ url });
});

MALRoutes.route("/auth/token").post(async (req, res) => {
  console.log("code_verifier:",req.body.code_verifier);
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
    
  });

  const url = `https://myanimelist.net/v2/oauth2/token`;
  const response = await axios.post(url, params);
  const json = await response.data;
  // console.log(json);
  res.send(json);
});

module.exports = MALRoutes;