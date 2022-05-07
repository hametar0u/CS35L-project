const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const UserTest = express.Router();

UserTest.route("/usertest").get(async (req, res) => {
  console.log("i got here");
  console.log(req.session);

  const access_token = req.session.tokens.access_token;
    const url = "https://api.myanimelist.net/v2/users/@me/animelist";
    const config = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    await axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        //TODO: if access token expired, redirect to /auth/refresh-token
        console.log(err.response);
        if (err.response.status === 401) {
            res.redirect(307, "/auth/v2"); //TODO: TEMPORARY
        }
        next(err);
      });

});

UserTest.route("/deleteFromList/:id").delete(async (req, res) => {
    console.log("i got to del");
    console.log(req.session);
  
    const access_token = req.session.tokens.access_token;
    const url = `https://api.myanimelist.net/v2/anime/${req.body.id}/my_list_status`;
    const config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        
    };
  
      await axios
        .delete(url, config)
        .then((response) => {
          console.log(response.data);
          res.status(200).send(response.data);
        })
        .catch((err) => {
          //TODO: if access token expired, redirect to /auth/refresh-token
          console.log(err.response);
          if (err.response.status === 401) {
              res.redirect(307, "/auth/v2"); //TODO: TEMPORARY
          }
          next(err);
        });
  
  });


  UserTest.route("/addToList/:id").post(async (req, res, next) => {
    console.log("i got to post");
    console.log(req.session);

    if(!req.session.tokens) res.send("no tokens");
    else {
      const access_token = req.session.tokens.access_token;
      const url = `https://api.myanimelist.net/v2/anime/${req.body.id}/my_list_status`;
      const config = {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          
      };
    
      await axios
        .post(url, config)
        .then((response) => {
          console.log(response.data);
          res.status(200).send(response.data);
        })
        .catch((err) => {
          //TODO: if access token expired, redirect to /auth/refresh-token
          console.log(err.response);
          if (err.response.status === 401) {
              res.redirect(307, "/auth/v2"); //TODO: TEMPORARY
          }
          next(err);
        });
    }
  
  });


module.exports = UserTest;
