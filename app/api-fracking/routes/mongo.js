var express = require("express");
var async = require("async");
var router = express.Router();
var jsonResponse = require("../models/jsonResponse");
var mongoose = require("mongoose");
var Fracking = mongoose.model("Fracking");
var axios = require('axios');

var LOC_API = process.env.LOC_API;

/* Default GET JSON for Mongo API */
router.get("/", function(req, res, next) {
  var response = new jsonResponse("Default /api endpoint for mongo", 200, []);
  res.json(response).status(response.status);
});

/* Get all geodata: GET /api/fracking */
router.get("/fracking", function(req, res, next) {

  console.log()
  Fracking.find({})
    .then(function(fracking) {
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
      return fracking
    })
    .then (function(data){
      var response = new jsonResponse("ok", 200, data);
      res.json(response).status(response.status);
    })
    .catch(next);
});

module.exports = router;