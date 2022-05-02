const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const MALRoutes = express.Router();

MALRoutes.route("/auth/get-code-verifier").get((req, res) => {
  res.send({code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20"});
});

MALRoutes.route("/auth").post(async (req, res) => {
  const code_challenge = req.body.code_challenge;
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
      if(!err.response) {
        next(err);
      }
      else if (err.response.status === 400 && err.response.data.hint === "Authorization code has expired") {
        res.redirect(307, `/auth/refresh-token?token=${json.refresh_token}`);
      }
      else {
        res.status(err.response.status).send(err.response.data.hint); //failsafe
      }
    });
});


MALRoutes.route("/auth/refresh-token").post(async (req, res, next) => {
  const urlParams = new URLSearchParams(req._parsedUrl.search);
  const refresh_token = urlParams.get("token");

  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "refresh_token",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
    refresh_token: refresh_token
  });

  const url = `https://myanimelist.net/v1/oauth2/token`;

  await axios.post(url, params)
    .then(response => {
      const json = response.data;
      console.log(json);
      res.redirect(307, `/get-user?Authorization=${json.access_token}`);
    })
    .catch(err => {
      if (!err.response) {
        next(err);
      }
      else{
        res.status(err.response.status).send(err.response); //failsafe
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

module.exports = MALRoutes;