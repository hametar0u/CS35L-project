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
  let params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: req.body.code,
    code_verifier: req.body.code_verifier.trim(),
    
  };

  // console.log("verifier in auth token: ", req.body.code_verifier);

  const url = `https://myanimelist.net/v1/oauth2/token`;
  await axios.post(url, querystring.stringify(params))
    .then(response => {
      // Work with the response...
      const json = response.data;
      console.log(json);
      res.send(json);
    }).catch(err => {
      // Handle error
      console.log(err.response.data);
      if(err.response && err.response.data.hint === "Authorization code has expired") {
        params.grant_type = "refresh_token";
        params.refresh_token = "def502003d97ff8b619dc87f618ebfe0688de7acfe5096f0100d4a42b39fc3a0e307f00dffb2904263a3b1ee98b4bec0cec364273d3f19bcf5053f3a5c3497741a16fb2cdd1d422412d5bdde4bc0c8635be3d245aac411f1f3498b5cfab3edfb18d7792605a04028676d8578fe0fb602aa09ef47ccd3ab9fd79228b941618a95f7f7df6c8e8806ff224f06d0519010308439bd29ef6159738f8e8e834dedcca390ef247bb3096c3e063acc12ab06129d217a041280f9d2a2ee4636a34605e3ab93bea9faf47432b369f39820111ced782d4905465edd029f8759c84dd4e74c910d20c98aa4ddfb787e970f90dd105afa449ea1af668a0fc4e117b02d326726b7a096349ffcfb7b712ea49bed8e17399dbd1718647d6d9555d7d82ab41066d3c381019ad284c4fad433f757437be901120d6db0a912214cfd9d7ed0db9e33c650a856a6b669cdbbda3def34b119de6e0e213cc35826c0332c37f388f38c308656c33799e6adb6cc63fc03c654e4a86ac028a9fad6bf076fc27d6a4ac1c0303794e6c395dc3eef04e061";
        axios.post(url, querystring.stringify(params))
          .then(response => {
            console.log("yay");
          })
          .catch(err => {
            console.log(err.response.data);
            next(err);
          });
      }
      next(err);
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