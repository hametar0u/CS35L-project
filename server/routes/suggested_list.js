const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent } = require("mongodb");
const { response } = require("express");

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

userRoute.route("/listings/colab").post(async ( req, res) => {
    const dbConnect = dbo.getDb();

})

userRoute.route("/listings/anime").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    //console.log(req.body);
    let str = ""
    let malId = 0
    if(req.body.anime == "") {
        res.send("Invalid");
    }
    else {
        let word = req.body.anime;
        for(let i = 0; i < word.length; i ++) {
            if(word[i] == " "){
                str += "-";
            } else {
                str += word[i];
            }
        }
        let url = `https://api.jikan.moe/v4/anime?q=${str}`
        await axios
            .get(url)
            .then((response) => {
                malId = response.data.data[0].mal_id
            })
            .catch((err) => {
                console.log(err);
            })
        let obj = {
            anime: req.body.anime,
            malId: malId
        }
        if(dbConnect.collection("UserList").find({id: req.body.user},{ colablist: {$exists: false}}) == {})
        {
            let colablist = [];
            colablist[0] = obj;
            dbConnect.collection("UserList").findOneAndUpdate({id: req.body.user},
                {$set: {colablist: colablist}}, 
                {upsert: true});
        } else {
            dbConnect
            .collection("UserList")
            .find({id: req.body.user})
            .toArray(function (err, result) {
                if (err) {
                    
                } else {
                    let response = result[0].colablist;
                    //console.log(response[0]);
                    var count = Object.keys(response).length;
                    //console.log(count);
                    for(let i = 0; i < count; i++) {
                        console.log(response[0]);
                        console.log(obj);
                        if(response[i] == obj) {
                            res.send("This object already exists");
                        }
                    }
                    // response[count] = obj;
                    // dbConnect.collection("UserList").findOneAndUpdate({user: req.body.user},
                    //     {$set: {colablist: response}}, 
                    //     {upsert: true});


                }
            });
        }
        // dbConnect
        //     .collection("UserList")
        //     .findOneAndUpdate({id: req.body.user},
        //         {$set: {colablist: colablist}}, 
        //         {upsert: true});

        res.send("Accessed anime route");
    }
})

userRoute.route("/listings/add").post(async (req, res) => {
    console.log(req.body);
    
    // console.log(req.query.user);
    // console.log(req.query.access_code);
    let url = `https://api.myanimelist.net/v2/users/${req.body.user}/animelist?fields=title&limit=100`
    let prev = ""
    const dbConnect = dbo.getDb();
    params = {
        headers: {
            Authorization: "Bearer " + req.body.access_code,
        },
    };
    let i = 0;
    anime = {
        title: []
    }
    node = {
        image: "",
        name: "",
        id: "",
    }

do {
    await axios
        .get(url, params)
        .then((response) => {
            console.log(response.data.data[0].node);
            var count = Object.keys(response.data.data).length;
            console.log(count);
            for(let k = 0; k < count; k++) {
                node.image = response.data.data[k].node.main_picture.medium;
                node.name = response.data.data[k].node.title;
                node.id = response.data.data[k].node.id;
                anime.title[i] = node;
                //anime.title[i] = response.data.data[k].node.title;
                //anime.title[i].image = response.data.data[k].node.main_picture.medium;
                i++;
            }

            if(response.data.paging.next) {
                url = response.data.paging.next;
            }
            else {
                prev = response.data.paging.prev;
            }
            console.log(url);
        })
        .catch((error) => {
            console.log(error);
        });
} while (prev == "");
        dbConnect
                .collection("anime_list")
                .findOneAndUpdate({user: req.body.user},
                                   {$set: {anime: anime}}, 
                                   {upsert: true});
                res.send("It worked");
        
});

module.exports = userRoute;
