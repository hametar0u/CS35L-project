const express = require('express');
const axios = require('axios');

const MALRoutes = express.Router();

MALRoutes.route("/auth").post(async (req, res) => {
  const code_challenge = req.body.code_challenge;
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&state=RequestID42`;
  res.send({ url });
});

MALRoutes.route("/auth/token").post(async (req, res) => {
  const code = req.body.code;
  // const url = `https://myanimelist.net/v1/oauth2/token?client_id=${process.env.CLIENT_ID}?client_secret=${process.env.CLIENT_SECRET}?code=${code}?code_verifier=${}`;
});

module.exports = MALRoutes;