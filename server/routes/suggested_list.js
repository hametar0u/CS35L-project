const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent } = require("mongodb");

userRoute.route("/listings").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("UserList")
        .find({id: req.body.id})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching Users!");
            } else {
                res.json(result);
            }
        });
});

userRoute.route("/listings/add").post(async function (req, res) {
    console.log(req.params);
    console.log(req.body.access_code);
    const url = `https://api.myanimelist.net/v2/users/${req.body.user}/animelist?&fields=title`
    const dbConnect = dbo.getDb();
    params = {
        headers: {
            Authorization: "Bearer " + req.body.access_code,
        },
    };

    // await axios
    //     .get(url, params)
    //     .then((response) => {
    //         anime = {
    //             user: req.body.user,
    //             data: response.data, 
    //         }
    //         dbConnect
    //             .collection("anime_list")
    //             .insertOne(anime, () => {});
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
        
});

module.exports = userRoute;
