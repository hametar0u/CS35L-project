const express = require("express");
const session = require("express-session");
const sRoutes = express.Router();

sRoutes.get('/sessioncount', (req, res) => {
  if (req.session.page_views) {
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});


sRoutes.post("/new", async (req, res) => {
  try {
    console.log(req.body.name);
    req.session.name = req.body.name;
    res.send({ message: "saved" }).status(201);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

sRoutes.get("/name", async (req, res) => {
  console.log(req.session);
  try {
    console.log(req.session.name);
    res.send({ message: req.session.name });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

sRoutes.get('/end', (req,res,next) => {
  req.session.destroy(err => {
    if(err){
        console.log(err);
    } else {
        res.send('Session is destroyed')
    }
  }); //DESTROYS SESSION
})

module.exports = sRoutes;