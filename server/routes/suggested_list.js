const express = require("express");
const session = require("express-session");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent, ObjectId } = require("mongodb");
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

userRoute.route("/listings/sharedList").get(async ( req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("shared_lists")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching shared_lists!");
            } else {
                console.log(result);
                res.json(result);
            }
        });
});

userRoute.route("/listings/jikanInfo").post(async (req, res) => {
    let str = ""
    let filter = {};
    console.log(req.body);
    if(req.body.anime == "") {
        res.send("It is empty");
        return;
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
    }
    
    let url = `https://api.jikan.moe/v4/anime?q=${str}&limit=5`
        await axios
            .get(url)
            .then((response) => {
                filter = response.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
        var count = Object.keys(filter).length;
        let jikanlist = []
    for(let i = 0; i < count; i++) 
    {
        let jikanfilter = 
        {
        title: filter[i].title,
        malId: filter[i].mal_id
        }
        jikanlist[i] = jikanfilter
    }
    res.send(jikanlist);


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

userRoute.route("/listings/addUser").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    if(req.body.user.name == req.body.colabuser)
    {
        res.send("You can't add urself");
        return;
    }
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
    
    let currentuser = {};
    let exist2 = false;
    newuserid = 0;
    for(let i = 0; i < count; i++ )
    {
        if(userlist[i].info.name == req.body.user.name) 
        {
            currentuser = userlist[i];
        }
        if(userlist[i].info.name == req.body.colabuser)
        {
            exist2 = true;
            newuserid = userlist[i].id;
        }
    }
    console.log(currentuser);
    console.log(exist2);
    if (currentuser == {} || exist2 == false) {
        res.send("This user doesn't exist in the db");
        return;
    }





    console.log(currentuser);
    let obj = {
        user: req.body.colabuser,
        id: newuserid
    }
    if(!currentuser.usercolablist) 
    {
        let newusercolablist = [];
        newusercolablist[0] = obj;
        
        dbConnect
            .collection("UserList")
            .findOneAndUpdate({id: currentuser.id},
                {$set: {usercolablist: newusercolablist}});
        res.send("Created a user colab list");
        return;
    }
    let exist = false;
    var count = Object.keys(currentuser.usercolablist).length;
    for(let i = 0; i < count; i++) {
        if(currentuser.usercolablist[i].user == req.body.colabuser)
        {
            exist = true;
        }
    }
    if (exist == true) {
        res.send("User is already colabed");
        return;
    }
    else
    {
        currentuser.usercolablist[count] = obj;
        dbConnect
            .collection("UserList")
            .findOneAndUpdate({id: currentuser.id},
                {$set: {usercolablist: currentuser.usercolablist}});
        res.send("Successfully added user to Colab List");
    }
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
    else if (!currentuser.sharedlist_id)
    {
        res.send("User doesn't have a colablist yet");
        return;
    }
    let shared = {}
    await axios 
    .get("http://localhost:5001/listings/sharedList")
    .then((response) => {
        shared = response.data;
    })
    .catch((err) => {
        console.log(err);
    });
    var count1 = Object.keys(shared).length;
    let users_shared_list = {};
    for(let i = 0; i < count1; i++)
    {
        if(shared[i]._id == currentuser.sharedlist_id) {
            users_shared_list = shared[i];
        }
    }
    var count2 = Object.keys(users_shared_list.anime).length;
    let exist = false;
    let index = 0;
    for(let i = 0; i < count2; i++ )
    {
        if(users_shared_list.anime[i].anime == req.body.anime)
        {
            console.log("exists");
            exist = true;
            index = i;
            break;
        }

    }
    if(exist == false)
    {
        res.send("This anime doesn't exist, failed to delete");
        return;
    }
    else 
    {
        dbConnect
            .collection("shared_lists")
            .updateOne({_id: ObjectId(currentuser.sharedlist_id)},
                {$pull: {anime: {anime: req.body.anime}}});
        res.send("Successfully deleted anime");
    }




})

userRoute.route("/listings/animeAdd").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    let str = ""
    let malId = 0
    if(req.body.anime == "") {
        res.send("Invalid");
        return;
    }
    
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
            return;
        }
        if (!currentuser.sharedlist_id) {
            let u = []
            u[0] = currentuser.info.name;
            let newsharedlist = [];
            newsharedlist[0] = obj;
            let data = {
                users: u,
                anime: newsharedlist
            }
            var groupid = 0;
            dbConnect
                .collection("shared_lists")
                .insertOne(data, function(err) {
                    if (err) {
                        return;
                    }
                    else {
                        dbConnect
                .collection("UserList")
                .findOneAndUpdate({id: req.body.user},
                    {$set: {sharedlist_id: data._id}});
                    }
                });
            res.send("Successfully created a colab list for user");
            return;
        }
        dbConnect
            .collection("shared_lists")
            .updateOne({_id: ObjectId(currentuser.sharedlist_id)},
                {$push: {anime: obj}});
        res.send("Successfully added anime to shared list");

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
