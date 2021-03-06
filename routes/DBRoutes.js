const express = require("express");
const session = require("express-session");
const logger = require("heroku-logger");
const axios = require("axios");
const querystring = require("querystring");
const userRoute = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearnedEvent, ObjectId } = require("mongodb");
const { response } = require("express");
const { exit } = require("process");
const { append } = require("express/lib/response");

//Extension function, not meant for frontend
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

//Adds current user to sharedList by sharedList Id (needs req.body.id == shared list object id)
userRoute.route("/AddUserBySharedListId").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    const username = req.session.userprofile.name;

    let currentuser = {};
    url = `https://our-anime-list-beta.herokuapp.com/listings/retrieveUserByName`;
    await axios
      .get(url, {
        params: {
          name: username,
        },
      })
      .then((response) => {
        currentuser = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    logger.info("==================================");
    logger.info(currentuser);

    dbConnect
      .collection("UserList")
      .findOneAndUpdate(
        { id: userid },
        { $set: { sharedlist_id: ObjectId(req.body.id) } }
      );

    let information1 = {};
    await axios
      .post("https://our-anime-list-beta.herokuapp.com/listings/getUserById", {
        username: username,
      })
      .then((response) => {
        if (response.data === {}) {
          res.status(400).send("No user found in MongoDB!");
          return;
        } else {
          information1 = response.data;
          logger.info("profile image url");
          logger.info(information1.images.jpg.image_url);
        }
      });
    logger.info(information1);
    let profile1 = {
      name: username,
      image: information1.images.jpg.image_url,
      url: information1.url,
    };
    dbConnect
      .collection("shared_lists")
      .findOneAndUpdate(
        { _id: ObjectId(currentuser.sharedlist_id) },
        { $pull: { users: profile1 } }
      );
    dbConnect
      .collection("shared_lists")
      .findOneAndUpdate(
        { _id: ObjectId(req.body.id) },
        { $push: { users: profile1 } }
      );
    logger.info("==================================hi");
    let empty = {
      userid: userid,
      access_token: access_token,
    };
    //Reallocate genres
    await axios
      .post(
        "https://our-anime-list-beta.herokuapp.com/listings/mainGenre",
        empty
      )
      .then((response) => {
        logger.info(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });
    res.send("Successfully added user to shared list by Id");
  } catch {
    logger.info("You are not logged in");
  }
});

//Return all the Users of a shared list (doesn't require any req)
userRoute.route("/getAllUsersOfList").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let sharedlist = {};
    //Grab shared list
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings/sharedList")
      .then((response) => {
        sharedlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    //Grab user's name
    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let users_shared_list = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        users_shared_list = userlist[i].sharedlist_id;
      }
    }
    var count2 = Object.keys(sharedlist).length;
    let listOfUsers = {};
    for (let i = 0; i < count2; i++) {
      if (sharedlist[i]._id == users_shared_list) {
        logger.info(sharedlist[i]);
        listOfUsers = {
          users: sharedlist[i].users,
        };
      }
    }
    res.send(listOfUsers);
  } catch {
    logger.info("You are not logged in");
  }
});

//Return 4 anime thumbnails, first username, and _id (doesn't require any req)
userRoute.route("/getSharedLists").post(async (req, res) => {
  try {
    const userprofilename = req.session.userprofile.name;
    logger.info("the name");
    logger.info(userprofilename);
    const dbConnect = dbo.getDb();
    let sharedlist = {};

    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings/sharedList")
      .then((response) => {
        logger.info(response.data);
        sharedlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });

    logger.info(sharedlist);
    logger.info("checkpoint 1");
    var count = Object.keys(sharedlist).length;
    let counter = 0;
    if (count > 10) {
      counter = 10;
    } else {
      counter = count;
    }
    let anime = [];
    let animeoutput = [];
    let output = {
      anime: [],
      username: "",
      id: 0,
    };
    for (let i = 0; i < counter; i++) {
      var count2 = Object.keys(sharedlist[i].anime).length;
      let othercounter = 0;
      if (count2 > 4) {
        othercounter = 4;
      } else {
        othercounter = count2;
      }
      logger.info(count2);
      for (let j = 0; j < othercounter; j++) {
        anime[j] = sharedlist[i].anime[j].main_picture.medium;
        logger.info(anime[j]);
      }
      logger.info(anime);
      //check if sharedlist is empty
      logger.info(typeof sharedlist[i].users);
      logger.info(
        "============================================================="
      );
      var thelength = Object.keys(sharedlist[i].users).length;
      logger.info(thelength);
      logger.info("logging list user username");
      sharedlist[i].users.forEach(user => {
        logger.info(user.name);
      });
    //   logger.info(sharedlist[i].users);
      logger.info(sharedlist[i].users == []);
      logger.info(sharedlist[i].users == {});
      if (thelength == 0) {
        output = {
          anime: anime,
          username: "",
          id: sharedlist[i]._id,
        };
      } else {
        var count4 = Object.keys(sharedlist[i].users).length;
        let samelist = false;
        for (let k = 0; k < count4; k++) {
          if (sharedlist[i].users[k].name == userprofilename) {
            samelist = true;
          }
        }
        if (samelist == true) {
          output = {
            anime: anime,
            username: "",
            id: sharedlist[i]._id,
          };
        } else {
          output = {
            anime: anime,
            username: sharedlist[i].users[0].name,
            id: sharedlist[i]._id,
          };
        }
      }
      animeoutput[i] = output;
      anime = [];
    }
    logger.info(animeoutput);
    output = {
      animelists: animeoutput,
    };
    res.send(output);
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Deletes all animes in a list (doesn't need any req)
userRoute.route("/obliterate").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    // Grab user
    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let user = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        logger.info("logged user");
        user = userlist[i];
      }
    }
    logger.info("checkpoint 1");
    logger.info(user.sharedlist_id);
    //Obliterate the list >:)
    dbConnect
      .collection("shared_lists")
      .findOneAndUpdate(
        { _id: ObjectId(user.sharedlist_id) },
        { $set: { anime: [] } }
      );
    res.send("Successfully cleared list");
  } catch {
    logger.info("User is not logged in");
  }
});

//Extension function, not meant for frontend
userRoute.route("/listings/mainGenre").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.body.userid;
    const access_token = req.body.access_token;

    //grab the list of users and list of shared lists
    let sharedlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings/sharedList")
      .then((response) => {
        sharedlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });

    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });

    //search for user's profile and grab their anime list
    let useranimelist = {};
    let username = null;
    let usersharedid = null;
    var count = Object.keys(userlist).length;
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        username = userlist[i].info.name;
        usersharedid = userlist[i].sharedlist_id;
        break;
      }
    }
    var count2 = Object.keys(sharedlist).length;
    for (let i = 0; i < count2; i++) {
      if (sharedlist[i]._id == usersharedid) {
        useranimelist = sharedlist[i];
        break;
      }
    }

    //use this list to get genre information
    let scores = {
      genre: null,
      counter: 0,
    };
    let simscore = [];
    let counter = 0;
    var count3 = Object.keys(useranimelist.anime).length;
    for (let i = 0; i < count3; i++) {
      if (useranimelist.anime[i].hasOwnProperty("genres")) {
        for (let j = 0; j < count3; j++) {
          if (useranimelist.anime[j].hasOwnProperty("genres")) {
            if (
              useranimelist.anime[i].genres[0].name ==
              useranimelist.anime[j].genres[0].name
            ) {
              counter++;
            }
          }
        }
        scores = {
          genre: useranimelist.anime[i].genres[0].name,
          counter: counter,
        };

        simscore[i] = scores;
        counter = 0;
      }
    }
    if (count3 == 0) {
      scores = {
        genre: "",
        counter: counter,
      };
      simscore[0] = scores;
    }
    dbConnect
      .collection("UserList")
      .findOneAndUpdate({ id: userid }, { $set: { score: simscore } });

    res.send("Success");
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Extension function, not meant for frontend
userRoute.route("/listings/getUserById").post(async (req, res) => {
  let obj = {};
  logger.info(req.body);

  let url = `https://api.jikan.moe/v4/users/${req.body.username}`;
  await axios
    .get(url)
    .then((response) => {
      obj = response.data.data;
    })
    .catch((err) => {
      logger.info(err);
    });
  res.send(obj);
});

//Return user w/ highest sim score (doesn't need any req)
userRoute.route("/listings/ReccomendUser").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let empty = {
      userid: userid,
      access_token: access_token,
    };
    await axios
      .post(
        "https://our-anime-list-beta.herokuapp.com/listings/mainGenre",
        empty
      )
      .then((response) => {
        logger.info(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });
    //Grab user
    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let user = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        user = userlist[i];
      }
    }
    //Search for user most popular genre
    var count2 = Object.keys(user.score).length;
    let genre = "";
    let counter = 0;
    for (let i = 0; i < count2; i++) {
      logger.info("score is");
      logger.info(user.score[i]);
      if (user.score[i] != null) {
        if (user.score[i].counter >= counter) {
          counter = user.score[i].counter;
          genre = user.score[i].genre;
        }
      }
    }
    //compare with each user's most popular genre
    var count3;
    let username = "";
    let recuserId = 0;
    let otherc = 0;
    for (let i = 0; i < count; i++) {
      if (userlist[i].hasOwnProperty("score")) {
        count3 = Object.keys(userlist[i].score).length;
        for (let j = 0; j < count3; j++) {
          logger.info("iterating");
          if (userlist[i].score[j] != null) {
            logger.info("Bypassed null if");
            if (
              userlist[i].score[j].counter >= otherc &&
              userlist[i].score[j].genre == genre &&
              userlist[i].sharedlist_id != user.sharedlist_id
            ) {
              username = userlist[i].info.name;
              otherc = userlist[i].score[j].counter;
              recuserId = userlist[i].id;
            }
          }
        }
      }
    }
    //Default case
    if (username == "") {
      username = "donald_trump";
      otherc = 2;
      recuserId = 14962659;
    }

    logger.info(username);
    logger.info(otherc);
    let ratio = 0;
    if (otherc > counter) {
      ratio = counter / otherc;
    } else {
      ratio = otherc / counter;
    }

    //get reccomended user's profile
    let information = {};
    await axios
      .post("https://our-anime-list-beta.herokuapp.com/listings/getUserById", {
        username: username,
      })
      .then((response) => {
        information = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    obj = {
      username: username,
      userid: recuserId,
      simscore: ratio,
      information: information,
    };
    res.send(obj);
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//search specific user (and calculates sim score) from db (needs req.body.name)
userRoute.route("/listings/SpecificUser").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let empty = {
      userid: userid,
      access_token: access_token,
    };
    //Reallocate genres
    await axios
      .post(
        "https://our-anime-list-beta.herokuapp.com/listings/mainGenre",
        empty
      )
      .then((response) => {
        logger.info(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });
    // Grab user
    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let user = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        logger.info("logged user");
        user = userlist[i];
      }
    }

    //Grab specific user
    let specificuser = {};
    for (let i = 0; i < count; i++) {
      logger.info(userlist[i].info.name);
      if (userlist[i].info.name == req.body.name) {
        specificuser = userlist[i];
      }
    }
    //check if user is adding themselves or a user in the same database, if so throw an error
    if (
      req.body.name == user.info.name ||
      specificuser.sharedlist_id == user.sharedlist_id
    ) {
      let error = {
        simscore: -2,
      };
      res.send(error);
      return;
    }
    //Check if they are in the same Shared list or if the user doesn't exist
    if (!specificuser.hasOwnProperty("info")) {
      let error = {
        simscore: -1,
      };
      res.send(error);
      return;
    }
    //Search for user most popular genre
    var count2 = Object.keys(user.score).length;
    let genre = "";
    let counter = 0;
    for (let i = 0; i < count2; i++) {
      logger.info(user.score[i]);
      if (user.score[i] != null) {
        if (user.score[i].counter >= counter) {
          counter = user.score[i].counter;
          genre = user.score[i].genre;
        }
      }
    }
    // compare with each user's most popular genre
    var count3;
    let otherc = 0;
    if (specificuser.hasOwnProperty("score")) {
      count3 = Object.keys(specificuser.score).length;
      for (let j = 0; j < count3; j++) {
        if (specificuser.score[j] != null) {
          if (
            specificuser.score[j].counter > otherc &&
            specificuser.score[j].genre == genre &&
            specificuser.sharedlist_id != user.sharedlist_id
          ) {
            otherc = specificuser.score[j].counter;
          }
        }
      }
    }
    let ratio = 0;
    if (otherc > counter) {
      ratio = counter / otherc;
    } else {
      ratio = otherc / counter;
    }
    let information = {};
    await axios
      .post("https://our-anime-list-beta.herokuapp.com/listings/getUserById", {
        username: req.body.name,
      })
      .then((response) => {
        if (response.data === {}) {
          res.status(400).send("No user found in MongoDB!");
          return;
        } else {
          information = response.data;
        }
      })
      .catch((err) => {
        logger.info(err);
      });
    obj = {
      username: req.body.name,
      simscore: ratio,
      image: information.images.jpg.image_url,
      url: information.url,
    };
    res.send(obj);
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Extension function, not meant for frontend
userRoute.route("/listings/sharedList").get(async (req, res) => {
  logger.info("/listings/sharedList");
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("shared_lists")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching shared_lists!");
      } else {
        //logger.info(result);
        res.json(result);
      }
    });
});

//Jikan filter (needs req.body.anime == anime name)
userRoute.route("/listings/jikanInfo").post(async (req, res) => {
  let str = "";
  let filter = {};
  logger.info(req.body);
  if (req.body.anime == "") {
    res.send("It is empty");
    return;
  } else {
    let word = req.body.anime;
    for (let i = 0; i < word.length; i++) {
      if (word[i] == " ") {
        str += "-";
      } else {
        str += word[i];
      }
    }
  }

  let url = `https://api.jikan.moe/v4/anime?q=${str}&limit=5`;
  await axios
    .get(url)
    .then((response) => {
      filter = response.data.data;
    })
    .catch((err) => {
      logger.info(err);
    });
  var count = Object.keys(filter).length;
  let jikanlist = [];
  for (let i = 0; i < count; i++) {
    let jikanfilter = {
      title: filter[i].title,
      malId: filter[i].mal_id,
    };
    jikanlist[i] = jikanfilter;
  }
  res.send(jikanlist);
});

//Extension function, not meant for frontend
userRoute.route("/listings/info").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  logger.info(req.query);
  dbConnect
    .collection("UserList")
    .find(req.query)
    .toArray(function (err, result) {
      //logger.info(result);
      res.send(result);
    });
});

//Extension function, not meant for frontend
userRoute.route("/getMALinfo").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let url = `https://api.myanimelist.net/v2/users/${req.body.name}/animelist?fields=list_status&limit=10`;
    let params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    await axios
      .get(url, params)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });
  } catch {
    logger.info("You are not logged in");
  }
});

//Adds current user to another shared list (needs req.body.colabuser)
userRoute.route("/listings/addUser").post(async (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const userid = req.session.userprofile.id; //user id stored here
    //Grab user info from User database
    let current_user = {};
    let url = `https://our-anime-list-beta.herokuapp.com/listings/retreiveUserById`;
    await axios
      .get(url, {
        params: {
          id: userid,
        },
      })
      .then((response) => {
        current_user = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    logger.info(current_user);
    //Check if user is adding themselves
    if (current_user.info.name == req.body.colabuser) {
      res.send("You can't add urself");
      return;
    }
    //Grab the appended user's info
    let append_user = {};
    url = `https://our-anime-list-beta.herokuapp.com/listings/retrieveUserByName`;
    await axios
      .get(url, {
        params: {
          name: req.body.colabuser,
        },
      })
      .then((response) => {
        append_user = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    logger.info(append_user);

    //Check if user doesn't have a shared list
    if (!current_user.sharedlist_id) {
      //Check if other user has a shared list
      if (append_user.sharedlist_id) {
        let information = {};
        await axios
          .post(
            "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
            { username: current_user.info.name }
          )
          .then((response) => {
            if (response.data === {}) {
              res.status(400).send("No user found in MongoDB!");
              return;
            } else {
              information = response.data;
            }
          })
          .catch((err) => {
            logger.info(err);
          });
        let profile = {
          name: current_user.info.name,
          image: information.images.jpg.image_url,
          url: information.url,
        };
        dbConnect
          .collection("UserList")
          .findOneAndUpdate(
            { id: current_user.id },
            { $set: { sharedlist_id: ObjectId(append_user.sharedlist_id) } },
            { $push: { users: profile } }
          );
        res.send("Successfully added user to colab list");
        return;
      } else {
        let information1 = {};
        await axios
          .post(
            "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
            { username: current_user.info.name }
          )
          .then((response) => {
            if (response.data === {}) {
              res.status(400).send("No user found in MongoDB!");
              return;
            } else {
              information1 = response.data;
            }
          });
        let information2 = {};
        await axios
          .post(
            "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
            { username: append_user.info.name }
          )
          .then((response) => {
            if (response.data === {}) {
              res.status(400).send("No user found in MongoDB!");
              return;
            } else {
              information2 = response.data;
            }
          });
        let profile1 = {
          name: current_user.info.name,
          image: information1.images.jpg.image_url,
          url: information1.url,
        };
        let profile2 = {
          name: append_user.info.name,
          image: information2.images.jpg.image_url,
          url: information2.url,
        };
        let users = [profile1, profile2];
        let anime = [];
        data = {
          users: users,
          anime: anime,
        };
        dbConnect.collection("shared_lists").insertOne(data, function (err) {
          if (err) {
            logger.info(err);
          } else {
            dbConnect
              .collection("UserList")
              .findOneAndUpdate(
                { id: current_user.id },
                { $set: { sharedlist_id: data._id } }
              );
            dbConnect
              .collection("UserList")
              .findOneAndUpdate(
                { id: append_user.id },
                { $set: { sharedlist_id: data._id } }
              );
          }
        });
        res.send("Successfully created colab list for both users");
        return;
      }
    } else if (!append_user.sharedlist_id) {
      let information = {};
      await axios
        .post(
          "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
          { username: append_user.info.name }
        )
        .then((response) => {
          if (response.data === {}) {
            res.status(400).send("No user found in MongoDB!");
            return;
          } else {
            information = response.data;
          }
        });
      let profile = {
        name: append_user.info.name,
        image: information.images.jpg.image_url,
        url: information.url,
      };
      dbConnect
        .collection("UserList")
        .findOneAndUpdate(
          { id: append_user.id },
          { $set: { sharedlist_id: ObjectId(current_user.sharedlist_id) } }
        );
      dbConnect
        .collection("shared_lists")
        .findOneAndUpdate(
          { _id: ObjectId(current_user.sharedlist_id) },
          { $push: { users: profile } }
        );
      res.send("Successfully added other user to current users colab list");
      return;
    } else {
      let information1 = {};
      await axios
        .post(
          "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
          { username: current_user.info.name }
        )
        .then((response) => {
          if (response.data === {}) {
            res.status(400).send("No user found in MongoDB!");
            return;
          } else {
            information1 = response.data;
          }
        });
      logger.info(information1);
      let profile1 = {
        name: current_user.info.name,
        image: information1.images.jpg.image_url,
        url: information1.url,
      };
      dbConnect
        .collection("shared_lists")
        .findOneAndUpdate(
          { _id: ObjectId(current_user.sharedlist_id) },
          { $pull: { users: profile1 } }
        );
      dbConnect
        .collection("shared_lists")
        .findOneAndUpdate(
          { _id: ObjectId(append_user.sharedlist_id) },
          { $push: { users: profile1 } }
        );
      dbConnect
        .collection("UserList")
        .findOneAndUpdate(
          { id: current_user.id },
          { $set: { sharedlist_id: ObjectId(append_user.sharedlist_id) } }
        );
      res.send("Successfully added you to their colab list");
      return;
    }
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Extension function, not meant for frontend
userRoute.route("/listings/retreiveUserById").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("UserList")
    .find({ id: parseInt(req.query.id) })
    .toArray(function (err, response) {
      if (err) {
        logger.info(err);
      } else {
        res.send(response[0]);
        return;
      }
    });
});

//Extension function, not meant for frontend
userRoute.route("/listings/retrieveUserByName").get(async (req, res) => {
  const dbConnect = dbo.getDb();
  logger.info(req.query.name);
  dbConnect
    .collection("UserList")
    .find({ "info.name": req.query.name })
    .toArray(function (err, response) {
      if (err) {
        logger.info(err);
      } else {
        res.send(response[0]);
      }
    });
});

//Deletes anime by the MAL ID (needs req.body.malId)
userRoute.route("/listings/animeDelete").post(async (req, res) => {
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const dbConnect = dbo.getDb();
    //Find current user profile on MongoDB
    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }

    if (currentuser == {}) {
      res.send("User Doesn't exist");
      return;
    } else if (!currentuser.sharedlist_id) {
      res.send("User doesn't have a colablist yet");
      return;
    }
    //Find user's shared list
    let shared = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings/sharedList")
      .then((response) => {
        shared = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count1 = Object.keys(shared).length;
    let users_shared_list = {};
    for (let i = 0; i < count1; i++) {
      if (shared[i]._id == currentuser.sharedlist_id) {
        users_shared_list = shared[i];
      }
    }
    //Find specific anime on shared list
    var count2 = Object.keys(users_shared_list.anime).length;
    let exist = false;
    let index = 0;
    for (let i = 0; i < count2; i++) {
      if (users_shared_list.anime[i].id == req.body.malId) {
        logger.info("exists");
        exist = true;
        index = i;
        break;
      }
    }
    if (exist == false) {
      res.send("This anime doesn't exist, failed to delete");
      return;
    } else {
      dbConnect
        .collection("shared_lists")
        .updateOne(
          { _id: ObjectId(currentuser.sharedlist_id) },
          { $pull: { anime: { id: parseInt(req.body.malId) } } }
        );
      res.send("Successfully deleted anime");
    }
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Adds anime by the MAL ID (needs req.body.malId)
userRoute.route("/listings/animeAddByMalID").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  //Access user's list
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    //Check if user exists in db
    var count = Object.keys(userlist).length;
    logger.info(count);

    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }
    if (currentuser == {}) {
      res.send("This user doesn't exist in the db");
      return;
    }
    //Get information about the anime
    let url = `https://api.myanimelist.net/v2/anime/${req.body.malId}?fields=id,title,genres`;
    let params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    let obj = {};
    await axios
      .get(url, params)
      .then((response) => {
        obj = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    //Check if current user has a sharedlist
    if (!currentuser.sharedlist_id) {
      //if the user doesn't have a sharedlist, create one
      let u = [];
      u[0] = currentuser.info.name;
      let newsharedlist = [];
      newsharedlist[0] = obj;
      let data = {
        users: u,
        anime: newsharedlist,
      };
      var groupid = 0;
      dbConnect.collection("shared_lists").insertOne(data, function (err) {
        if (err) {
          return;
        } else {
          dbConnect
            .collection("UserList")
            .findOneAndUpdate(
              { id: req.body.user },
              { $set: { sharedlist_id: data._id } }
            );
        }
      });
      res.send("Successfully created a colab list for user");
      return;
    } else {
      // Otherwise user has a sharedlist, add anime to that list
      dbConnect
        .collection("shared_lists")
        .updateOne(
          { _id: ObjectId(currentuser.sharedlist_id), anime: { $ne: obj } },
          { $push: { anime: obj } }
        );
      res.send("Successfully added anime to shared list");
    }
  } catch {
    res.status(500).send("Couldn't add anime");
  }
});

//Checks if it is a new user, and if so creates a sharedlist for them as well as a temp simscore (doesn't need any req)
userRoute.route("/CheckIfNewUser").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.body.userid; //user id stored here
    const access_token = req.body.access_token; //access token stored here
    logger.info("CheckIfNewUserCalled");
    logger.info(userid);
    //Get user information
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    //Check if user exists in db
    var count = Object.keys(userlist).length;
    logger.info(count);

    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }
    if (currentuser == {}) {
      return;
    }

    //Check if the current user has a sharedlist_id and a simscore
    if (
      !currentuser.hasOwnProperty("sharedlist_id") &&
      !currentuser.hasOwnProperty("score")
    ) {
      let information1 = {};
      await axios
        .post(
          "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
          { username: currentuser.info.name }
        )
        .then((response) => {
          if (response.data === {}) {
            res.status(400).send("No user found in MongoDB!");
            return;
          } else {
            logger.info("============================================v1");
            information1 = response.data;
          }
        });
      logger.info(information1);
      let profile1 = {
        name: currentuser.info.name,
        image: information1.images.jpg.image_url,
        url: information1.url,
      };
      let u = [];
      u[0] = profile1;
      let newsharedlist = [];
      let data = {
        users: u,
        anime: newsharedlist,
      };
      logger.info("============================================v1");
      logger.info(data);
      dbConnect.collection("shared_lists").insertOne(data, function (err) {
        if (err) {
          return;
        } else {
          dbConnect
            .collection("UserList")
            .findOneAndUpdate(
              { id: userid },
              { $set: { sharedlist_id: data._id } }
            );
        }
      });
    }
    let empty = {
      userid: userid,
      access_token: access_token,
    };
    await axios
      .post(
        "https://our-anime-list-beta.herokuapp.com/listings/mainGenre",
        empty
      )
      .then((response) => {
        logger.info(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });

    res.send("successfully allocated new user");
  } catch {
    res.status(400).send("You are not logged in");
  }
});

//Depracated
userRoute.route("/listings/animeAdd").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  let str = "";
  let malId = 0;
  let genre = "";
  if (req.body.anime == "") {
    res.send("Invalid");
    return;
  } else if (req.body.user == undefined) {
    res.send("You are not logged in, unable to obtain user info");
    return;
  } else {
    let word = req.body.anime;
    for (let i = 0; i < word.length; i++) {
      if (word[i] == " ") {
        str += "-";
      } else {
        str += word[i];
      }
    }
    let url = `https://api.jikan.moe/v4/anime?q=${str}`;
    await axios
      .get(url)
      .then((response) => {
        malId = response.data.data[0].mal_id;
        genre = response.data.data[0].genres[0].name;
      })
      .catch((err) => {
        logger.info(err);
      });
    let obj = {
      anime: req.body.anime,
      malId: malId,
      genre: genre,
    };
    //End of jikan moe info

    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    logger.info(count);

    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == req.body.user) {
        currentuser = userlist[i];
      }
    }
    logger.info(currentuser);
    if (currentuser == {}) {
      res.send("This user doesn't exist in the db");
      return;
    }
    if (!currentuser.sharedlist_id) {
      let u = [];
      u[0] = currentuser.info.name;
      let newsharedlist = [];
      newsharedlist[0] = obj;
      let data = {
        users: u,
        anime: newsharedlist,
      };
      var groupid = 0;
      dbConnect.collection("shared_lists").insertOne(data, function (err) {
        if (err) {
          return;
        } else {
          dbConnect
            .collection("UserList")
            .findOneAndUpdate(
              { id: req.body.user },
              { $set: { sharedlist_id: data._id } }
            );
        }
      });
      res.send("Successfully created a colab list for user");
      return;
    }
    dbConnect
      .collection("shared_lists")
      .updateOne(
        { _id: ObjectId(currentuser.sharedlist_id), anime: { $ne: obj } },
        { $push: { anime: obj } }
      );
    res.send("Successfully added anime to shared list");
  }
});

//Returns specific user's anime from MAL (needs req.body.id)
userRoute.route("/listings/getUserFromMAL").post(async (req, res) => {
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    //Get specific user from MongoDB (not current user)
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let otheruser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == req.body.id) {
        otheruser = userlist[i];
      }
    }

    if (otheruser == {}) {
      res.send("User Doesn't exist");
      return;
    }
    //Get specific user's anime's from MAL
    let url = `https://api.myanimelist.net/v2/users/${otheruser.info.name}/animelist?fields=title&limit=100`;
    let prev = "";
    const dbConnect = dbo.getDb();
    params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    let i = 0;
    anime = {
      title: [],
    };

    do {
      await axios
        .get(url, params)
        .then((response) => {
          var count = Object.keys(response.data.data).length;
          logger.info(count);
          for (let k = 0; k < count; k++) {
            let node = {
              id: response.data.data[k].node.id,
              title: response.data.data[k].node.title,
              main_picture: response.data.data[k].node.main_picture,
            };
            anime.title[i] = node;
            i++;
          }

          if (response.data.paging.next) {
            url = response.data.paging.next;
          } else {
            prev = response.data.paging.prev;
          }
          logger.info(url);
        })
        .catch((error) => {
          logger.info(error);
        });
    } while (prev == "");
    // dbConnect
    //         .collection("anime_list")
    //         .findOneAndUpdate({user: currentuser.info.name},
    //                         {$set: {anime: anime}},
    //                         {upsert: true});
    res.send(anime.title);
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Returns all animes of user's profile on MAL (doesn't need any req)
userRoute.route("/listings/allanimes").post(async (req, res) => {
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    //Get current user document
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }

    if (currentuser == {}) {
      res.send("User Doesn't exist");
      return;
    }
    //get all anime from user
    let url = `https://api.myanimelist.net/v2/users/${currentuser.info.name}/animelist?fields=title&limit=100`;
    let prev = "";
    const dbConnect = dbo.getDb();
    params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    let i = 0;
    anime = {
      title: [],
    };

    do {
      await axios
        .get(url, params)
        .then((response) => {
          var count = Object.keys(response.data.data).length;
          logger.info(count);
          for (let k = 0; k < count; k++) {
            let node = {
              id: response.data.data[k].node.id,
              title: response.data.data[k].node.title,
              main_picture: response.data.data[k].node.main_picture,
            };
            anime.title[i] = node;
            //anime.title[i] = response.data.data[k].node.title;
            //anime.title[i].image = response.data.data[k].node.main_picture.medium;
            i++;
          }

          if (response.data.paging.next) {
            url = response.data.paging.next;
          } else {
            prev = response.data.paging.prev;
          }
          logger.info(url);
        })
        .catch((error) => {
          logger.info(error);
        });
    } while (prev == "");
    // dbConnect
    //         .collection("anime_list")
    //         .findOneAndUpdate({user: currentuser.info.name},
    //                         {$set: {anime: anime}},
    //                         {upsert: true});
    res.send(anime.title);
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Returns all animes from MongoDB shared list (doesn't need any req)
userRoute.route("/listings/allanimesSharedList").post(async (req, res) => {
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }

    if (currentuser == {}) {
      res.send("User Doesn't exist");
      return;
    }
    let shared = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings/sharedList")
      .then((response) => {
        shared = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count1 = Object.keys(shared).length;
    let users_shared_list = {};
    let exist = false;
    for (let i = 0; i < count1; i++) {
      logger.info(shared[i]._id);
      logger.info(currentuser.sharedlist_id);
      if (shared[i]._id == currentuser.sharedlist_id) {
        exist = true;
        users_shared_list = shared[i];
      }
    }
    if (exist == false) {
      res.send("This anime doesn't exist, failed to delete");
      return;
    } else {
      res.send(users_shared_list.anime);
    }
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Search specific user by MAL and calculate sim score (needs req.body.name == searched User's name)
userRoute.route("/listings/SearchUserMAL").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    //Reallocate Genres
    let empty = {
      userid: userid,
      access_token: access_token,
    };
    await axios
      .post(
        "https://our-anime-list-beta.herokuapp.com/listings/mainGenre",
        empty
      )
      .then((response) => {
        logger.info(response.data);
      })
      .catch((err) => {
        logger.info(err);
      });
    //Grab user
    let userlist = {};
    await axios
      .get("https://our-anime-list-beta.herokuapp.com/listings")
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let user = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        user = userlist[i];
      }
    }

    //Search for user most popular genre
    var count2 = Object.keys(user.score).length;
    let genre = "";
    let counter = 0;
    for (let i = 0; i < count2; i++) {
      logger.info(user.score[i]);
      if (user.score[i] != null) {
        if (user.score[i].counter > counter) {
          counter = user.score[i].counter;
          genre = user.score[i].genre;
        }
      }
    }
    //Grab searched user's anime list from MAL
    let url = `https://api.myanimelist.net/v2/users/${req.body.name}/animelist?fields=list_status&limit=19`;
    let params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    searcheduser = {};
    let exist = false;
    await axios
      .get(url, params)
      .then((response) => {
        searcheduser = response.data;
        exist = true;
      })
      .catch((err) => {
        logger.info(err);
      });
    if (exist == false) {
      res.status(400).send("MAL user does not exist");
    } else {
      //get searched user's profile if they exist on MongoDB
      // let information = {};
      // await axios
      //     .post("https://our-anime-list-beta.herokuapp.com/listings/getUserById", {username: req.body.name})
      //     .then((response) => {
      //         if (response.data === {}) {
      //             res.status(400).send("No user found in MongoDB!");
      //             return;
      //         }
      //         else {
      //             information = response.data;
      //         }
      //     })
      //     .catch((err) => {
      //         logger.info(err);
      //     });
      //generate simscore
      let otherc = 0;
      var count5 = Object.keys(searcheduser.data).length;
      let id = 0;
      let item = {
        id: 0,
      };

      for (let i = 0; i < count5; i++) {
        id = searcheduser.data[i].node.id;
        item = {
          params: params,
          id: id,
        };
        await axios
          .post(
            "https://our-anime-list-beta.herokuapp.com/listings/getGenre",
            item
          )
          .then((response) => {
            if (genre == response.data.genre) {
              otherc++;
            }
          })
          .catch((err) => {
            logger.info(err);
          });
      }
      let simscore = 0;
      if (otherc > counter) {
        simscore = counter / otherc;
      } else {
        simscore = otherc / counter;
      }
      let information = {};
      await axios
        .post(
          "https://our-anime-list-beta.herokuapp.com/listings/getUserById",
          { username: req.body.name }
        )
        .then((response) => {
          if (response.data === {}) {
            res.status(400).send("No user found in MongoDB!");
            return;
          } else {
            information = response.data;
          }
        });
      obj = {
        username: req.body.name,
        simscore: simscore,
        image: information.images.jpg.image_url,
        url: information.url,
      };
      res.send(obj);
    }
  } catch {
    res.status(500).send("You are not logged in");
  }
});

//Finds the given anime genre (Extension function, not meant for frontend)
userRoute.route("/listings/getGenre").post(async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    //const userid = req.session.userprofile.id; //user id stored here
    //const access_token = req.session.tokens.access_token; //access token stored here
    logger.info(req.body);

    //find anime genre
    let genre = "";
    await axios
      .get(
        `https://api.myanimelist.net/v2/anime/${req.body.id}?fields=genres`,
        req.body.params
      )
      .then((response) => {
        genre = response.data.genres[0].name;
      })
      .catch((err) => {
        logger.info(err);
      });
    let info = {
      genre: genre,
    };
    res.send(info);
  } catch {
    logger.info("user not logged in");
  }
});

//grab list of recommended anime from MAL, with limit 10 (doesn't need any req)
userRoute.route("/listings/listOfRecommendedAnime").post(async (req, res) => {
  try {
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    let userlist = {};
    let url2 = `https://our-anime-list-beta.herokuapp.com/listings`;
    //Get current user document
    await axios
      .get(url2)
      .then((response) => {
        userlist = response.data;
      })
      .catch((err) => {
        logger.info(err);
      });
    var count = Object.keys(userlist).length;
    let currentuser = {};
    for (let i = 0; i < count; i++) {
      if (userlist[i].id == userid) {
        currentuser = userlist[i];
      }
    }

    if (currentuser == {}) {
      res.send("User Doesn't exist");
      return;
    }
    //get suggested anime from user's MAL profile
    let url = `https://api.myanimelist.net/v2/anime/suggestions?limit=10`;
    let prev = "";
    const dbConnect = dbo.getDb();
    params = {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    let i = 0;
    anime = {
      title: [],
    };
    await axios
      .get(url, params)
      .then((response) => {
        var count = Object.keys(response.data.data).length;
        logger.info(count);
        for (let k = 0; k < count; k++) {
          let node = {
            id: response.data.data[k].node.id,
            title: response.data.data[k].node.title,
            main_picture: response.data.data[k].node.main_picture,
          };
          anime.title[i] = node;
          //anime.title[i] = response.data.data[k].node.title;
          //anime.title[i].image = response.data.data[k].node.main_picture.medium;
          i++;
        }
      })
      .catch((error) => {
        logger.info(error);
      });
    // dbConnect
    //         .collection("anime_list")
    //         .findOneAndUpdate({user: currentuser.info.name},
    //                         {$set: {anime: anime}},
    //                         {upsert: true});
    res.send(anime.title);
  } catch {
    res.status(500).send("You are not logged in");
  }
});
/* Example Route for req.session */
userRoute.route("/get-userid-from-session").get((req, res) => {
  try {
    //note: you have to be logged in for this to work; so either you guarantee guarantee these things are only accessed when user is logged in, or wrap this is a try-catch like I did in this exmaple.
    const userid = req.session.userprofile.id; //user id stored here
    const access_token = req.session.tokens.access_token; //access token stored here
    res.status(200).send({
      user_id: userid,
      access_token: access_token,
    });
  } catch {
    res.status(500).send("sum ting wong probably ur not logged in");
  }
});

module.exports = userRoute;
