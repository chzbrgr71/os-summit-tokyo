var express = require("express");
var async = require("async");
var router = express.Router();
var jsonResponse = require("../models/jsonResponse");
var mongoose = require("mongoose");
var Weather = mongoose.model("Weather");
var axios = require('axios');

var LOC_API = process.env.LOC_API;

/* Default GET JSON for Mongo API */
router.get("/", function(req, res, next) {
  var response = new jsonResponse("Default /api endpoint for mongo", 200, []);
  res.json(response).status(response.status);
});

/* Get all geodata: GET /api/weather */
router.get("/weather", function(req, res, next) {

  console.log()
  Weather.find({})
    .then(function(weather) {
      // make REST api call to location
      var locationApi = 'http://' + LOC_API + '/api/location'
      console.log(locationApi)
      axios.get(locationApi)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      return weather
    })
    .then (function(data){
      var response = new jsonResponse("ok", 200, data);
      res.json(response).status(response.status);
    })
    .catch(next);
});

module.exports = router;