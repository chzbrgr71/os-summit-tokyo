var express = require("express");
var async = require("async");
var router = express.Router();
var jsonResponse = require("../models/jsonResponse");
var mongoose = require("mongoose");
var Geodata = mongoose.model("Geodata");


/* Default GET JSON for Mongo API */
router.get("/", function(req, res, next) {
  var response = new jsonResponse("Default /api endpoint for mongo", 200, []);
  res.json(response).status(response.status);
});

/* Get all geodata: GET /api/geodata */
router.get("/geodata", function(req, res, next) {
  Geodata.find({})
    .then(function(geodata) {
      var response = new jsonResponse("ok", 200, geodata);
      res.json(response).status(response.status);
    })
    .catch(next);
});

module.exports = router;