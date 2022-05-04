const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const MAL = express.Router();

MAL.route('/sessioncount').get((req, res) => {
  if (req.session.page_views) {
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});


MAL.route("/auth/v2/login").post(async (req, res, next) => {
  console.log(req.body.name);
  req.session.name = req.body.name;
  req.session.codes = {
    code: req.body.code,
    code_verifier: req.body.code_challenge
  };
  
  if (!req.session.tokens) {
    res.redirect(307, "/auth/v2/token");
  }
  else {
    const access_token = req.session.tokens.access_token;
    const url = "https://api.myanimelist.net/v2/users/@me";
    const config = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
  
    await axios.get(url, config)
      .then(response => {
        console.log(response.data);
        // res.status(200).send(response.data);
        res.send("ok");
      })
      .catch(err => {
        //TODO: if access token expired, redirect to /auth/refresh-token
        console.log(err.response);
        if (err.response.status === 401) {
          if (!req.body.code_challenge) {
            res.status(400).send("bad code challenge")
          }
          else {
            res.redirect(307, "/auth/v2"); //TODO: TEMPORARY
          }
        }
        next(err);
      });
  }
});

MAL.route("/auth/v2/token").post(async (req, res, next) => {
  console.log("token: ", req.session);
  if (!req.session.codes.code_verifier) {
    res.redirect(307, "/auth/v2");
  }
  else {
    const params = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.session.codes.code,
      code_verifier: req.session.codes.code_verifier
    });

    const url = `https://myanimelist.net/v1/oauth2/token`;

    await axios.post(url, params)
      .then(response => {
        req.session.tokens = response.data;
        console.log(req.session);
        console.log("token retrieval successful");
        res.redirect(307, "/auth/v2/login");
      })
      .catch(err => {
        console.log(err.response.data);
        if (err.response && err.response.status === 400) {
          res.redirect(307, "/auth/v2");
        }
        else {
          next(err);
        }
        
      })

  }

});

MAL.route("/auth/v2").post(async (req, res) => {
  console.log("/auth: ", req.session);
  if (!req.session.codes.code_verifier) {
    res.status(400).send("bad code challenge");
  }
  else {
    const code_challenge = req.session.codes.code_verifier;
    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&code_challenge=${code_challenge}&code_challenge_method=plain&state=RequestID42`;
    res.send({ url });
  }
});

MAL.route("/checksession").get(async (req, res) => {
  console.log("/checksession: ", req.session);
  try {
    console.log(req.session.name);
    res.send(req.session);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

MAL.get('/end', (req,res,next) => {
  req.session.destroy(err => {
    if(err){
        console.log(err);
    } else {
        res.send('Session is destroyed')
    }
  }); //DESTROYS SESSION
})

module.exports = MAL;