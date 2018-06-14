var express = require("express");
var async = require("async");
var router = express.Router();
var jsonResponse = require("../models/jsonResponse");

var imageTag = process.env.IMAGE_TAG;

/* Default GET JSON for Mongo API */
router.get("/", function(req, res, next) {
    var response = new jsonResponse("Default /api endpoint", 200, []);
    res.json(response).status(response.status);
  });

/* GET for location */
router.get("/location", function (req, res, next) {
    setTimeoutAsync(function () {
        var rtnobject = { "branchID":"1001", "branchLoc":"Pittsburgh", "imageTag":imageTag };
        var response = new jsonResponse("ok", 200, rtnobject);
        res.json(response).status(response.status);
    }, Math.floor(Math.random() * 1100) + 1);
});

function setTimeoutAsync(callback, time) {
    setTimeout(function () {
        callback()
    }, time)
    return 0
}

module.exports = router;