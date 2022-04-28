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
app.use(require("./routes/letterbox"));

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
})

//https://www.mongodb.com/languages/mern-stack-tutorial