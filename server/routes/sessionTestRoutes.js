// const express = require("express");
// const session = require("express-session");
// const sRoutes = express.Router();

// sRoutes.route("/session/add").post((req, res) => {
//   console.log(req.body.userid);
//   req.session.userid = req.body.userid;
//   res.send("updated session");
// });

// sRoutes.route("/session").get((req, res) => {
//   session = req.session;
//   if (session.userid === "1234") {
//     res.send(`Welcome User ${session.userid}`);
//   } else {
//     res.send("You're not welcome");
//   }
// });

// module.exports = sRoutes;