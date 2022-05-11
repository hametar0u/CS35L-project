const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent } = require("mongodb");
const { response } = require("express");
const { exit } = require("process");

userRoute.route("/listings").get(async (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("UserList")
        .find({})
        .toArray(function (err, result) {
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

userRoute.route("/listings/animeDelete").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    let userlist = {}
        let url2 = `http://localhost:5001/listings`
        await axios
            .get(url2)
            .then((response) => {
                userlist = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    var count = Object.keys(userlist).length;
    let currentuser = {};
    for(let i = 0; i < count; i++ ) 
    {
        if(userlist[i].id == req.body.user)
        {
            currentuser = userlist[i];
        }
    }

    if(currentuser == {})
    {
        res.send("User Doesn't exist");
        return;
    }
    else if (!currentuser.colablist)
    {
        res.send("User doesn't have a colablist yet");
        return;
    }
    var count2 = Object.keys(currentuser.colablist).length;
    let exist = false;
    newcolablist = [];
    j= 0;
    for(let i = 0; i < count2; i++ )
    {
        if(currentuser.colablist[i].anime == req.body.anime)
        {
            console.log("exists");
            exist = true;
        }
        else 
        {
            newcolablist[j]= currentuser.colablist[i];
            j++;
        }

    }
    if(exist == false)
    {
        res.send("This anime doesn't exist, failed to delete");
    }
    else 
    {
        dbConnect
            .collection("UserList")
            .findOneAndUpdate({id: req.body.user},
                {$set: {colablist: newcolablist}});
        res.send("Successfully deleted anime");
    }




})

userRoute.route("/listings/animeAdd").post(async (req, res) => {
    const dbConnect = dbo.getDb();
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
            });
        let obj = {
            anime: req.body.anime,
            malId: malId
        }
        //console.log(obj);
        //End of jikan moe info
        let userlist = {}
        let url2 = `http://localhost:5001/listings`
        await axios
            .get(url2)
            .then((response) => {
                userlist = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        var count = Object.keys(userlist).length;
        console.log(count);
        
        let currentuser = {}
        for(let i = 0; i < count; i++ )
        {
            if(userlist[i].id == req.body.user) 
            {
                currentuser = userlist[i];
            }
        }
        if (currentuser == {}) {
            res.send("This user doesn't exist in the db");
        }
        if (!currentuser.colablist) {
            let newcolablist = [];
            newcolablist[0] = obj;
            dbConnect
                .collection("UserList")
                .findOneAndUpdate({id: req.body.user},
                    {$set: {colablist: newcolablist}});
            res.send("Successfully created a colab list for user");
            return;
        }
        
        let exist = false;
        var count2 = Object.keys(currentuser.colablist).length;
        for(let i = 0; i < count2; i++ ) 
        {
            if(currentuser.colablist[i].malId == obj.malId) 
            {
                exist = true;
            }
        }
        if (exist == true) 
        {
            res.send("This anime already exists in the db");
        }
        else {

        currentuser.colablist[count2] = obj;

        dbConnect
            .collection("UserList")
            .findOneAndUpdate({id: req.body.user},
                {$set: {colablist: currentuser.colablist}}, 
                {upsert: true});
        res.send("Successfully inserted anime");
        }
    }
})

userRoute.route("/listings/allanimes").post(async (req, res) => {
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
