const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent } = require("mongodb");

userRoute.route("/listings").get(async (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("UserList")
        .find({})
        .toArray(function (err, result) {
            console.log(result);
            if (err) {
                res.status(400).send("Error fetching Users!");
            } else {
                res.json(result);
            }
        });
});

userRoute.route("/listings/info").get(async (req, res) => {
    const dbConnect = dbo.getDb();
    console.log(req.query);
    dbConnect
        .collection("UserList")
        .find(req.query)
        .toArray(function (err, result) {
            //console.log(result);
            res.send(result);
    });
});

userRoute.route("/listings/suggested").post(async ( req, res) => {
    const url = ``
})

userRoute.route("/listings/add").post(async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    
    console.log(req.query.user);
    console.log(req.query.access_code);
    const url = `https://api.myanimelist.net/v2/users/${req.query.user}/animelist?fields=title`
    const dbConnect = dbo.getDb();
    params = {
        headers: {
            Authorization: "Bearer " + req.query.access_code,
        },
    };

    await axios
        .get(url, params)
        .then((response) => {
            //console.log(response);
            anime = {
                data: response.data, 
            }
            dbConnect
                .collection("anime_list")
                .findOneAndUpdate({user: "Mary"},
                                   {$set: {suggestedanime: anime.data}}, 
                                   {upsert: true});
                res.send("It worked");
        })
        .catch((error) => {
            console.log(error);
        });
        
});

module.exports = userRoute;
