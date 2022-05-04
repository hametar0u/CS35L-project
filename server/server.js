const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());


//session imports
const session = require("express-session");
//session middleware
const oneMonthIsh = 1000 * 60 * 60 * 24 * 31;
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);


//DB stuff
app.use(require("./routes/record"));
//get driver connection
const dbo = require("./db/conn");

//letterbox interaction
// app.use(require("./routes/letterbox"));
//MAL interaction
app.use(require("./routes/MAL"));
app.use(require("./routes/MALv2"));


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(432).send('this shit again!!');
  next(err);
});

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
})

//https://www.mongodb.com/languages/mern-stack-tutorial