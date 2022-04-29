const express = require('express');
const axios = require('axios');

const MALRoutes = express.Router();

MALRoutes.route("/auth").post(async (req, res) => {
  // console.log(req);
  const code_challenge = req.body.code_challenge;
  const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&state=RequestID42`;
  res.send({ url });
  // const response = await axios.get(url);
  // const json = await response.data;
  // console.log(json);
});

module.exports = MALRoutes;