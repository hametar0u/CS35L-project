const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

var whitelist = ['http://localhost:3000'];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

//DB stuff
app.use(require("./routes/record"));
//get driver connection
const dbo = require("./db/conn");

//letterbox interaction
// app.use(require("./routes/letterbox"));
//MAL interaction
app.use(require("./routes/MAL"));
// app.use(require("./routes/sessionTestRoutes"));

//session imports
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');

//session middleware
const oneMonthIsh = 1000 * 60 * 60 * 24 * 31;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: { maxAge: oneMonthIsh }
}));

//app.use(express.urlencoded({ extended: true }));
//cookie parser middleware
app.use(cookieParser());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(432).send('this shit again!!');
  next(err);
});


app.post("/session/add", (req, res) => {
  console.log(req.body.userid);
  req.session.userid = req.body.userid;
  console.log(req.session);
  res.send("updated session");
});

app.get("/session", (req, res) => {
  console.log(req.session);
  req.session = req.session;
  if (req.session.userid === "1234") {
    res.send(`Welcome User ${session.userid}`);
  } else {
    res.send("You're not welcome");
  }
});

// app.get("/session", (req, res) => {
//   console.log(req.session);
//   req.session.user = {
//     uuid: '12234-2345-2323423'
//   }; //THIS SETS AN OBJECT - 'USER'
//   if (req.session.page_views) req.session.page_views ++;
//   else req.session.page_views = 1;
//   req.session.save(err => {
//     if(err){
//         console.log(err);
//     } else {
//         res.send({uuid: req.session.user.uuid, views: req.session.page_views}) // YOU WILL GET THE UUID IN A JSON FORMAT
//     }
//   }); //THIS SAVES THE SESSION.
// });

// app.get('/end', (req,res,next) => {
//   req.session.destroy(err => {
//     if(err){
//         console.log(err);
//     } else {
//         res.send('Session is destroyed')
//     }
//   }); //THIS DESTROYES THE SESSION.
// })

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
})

//https://www.mongodb.com/languages/mern-stack-tutorial