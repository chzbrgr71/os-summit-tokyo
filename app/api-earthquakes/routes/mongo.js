var express = require("express");
var async = require("async");
var router = express.Router();
var jsonResponse = require("../models/jsonResponse");
var mongoose = require("mongoose");
var Earthquake = mongoose.model("Earthquake");
var axios = require('axios');

/* Default GET JSON for Mongo API */
router.get("/", function(req, res, next) {
  var response = new jsonResponse("Default /api endpoint for mongo", 200, []);
  res.json(response).status(response.status);
});

/* Get all geodata: GET /api/geodata */
router.get("/earthquakes", function(req, res, next) {

  console.log()
  Earthquake.find({})
    .then(function(earthquakes) {
      // make REST api call to location
      axios.get('http://localhost:8000/api/location')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      return earthquakes
    })
    .then (function(data){
      var response = new jsonResponse("ok", 200, data);
      res.json(response).status(response.status);
    })
    .catch(next);
});

module.exports = router;