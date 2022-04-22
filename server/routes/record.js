const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

const dbo = require("../db/conn");
const { ConnectionPoolClearedEvent } = require("mongodb");

//get list of all documents
recordRoutes.route("/listings").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("listingsAndReviews")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

//creates a new document
recordRoutes.route("/listings/add").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
  };

  dbConnect
    .collection("matches")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

//sample route for incrementing a field value
recordRoutes.route("/listings/updateLike").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const update = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection("listingsAndReviews")
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
});

//sample route for updating document values
recordRoutes.route("/update/:id").post(function (req, response) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.summary,
      level: req.body.listing_url,
    },
  };

  dbConnect
    .collection("listingsAndReviews")
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
});

//delete a document entry
recordRoutes.route("/listings/delete/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection("listingsAndReviews")
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log("1 document deleted");
      }
    });
});

module.exports = recordRoutes;
