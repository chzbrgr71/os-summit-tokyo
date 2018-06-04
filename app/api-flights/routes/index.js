var express = require('express');
var router = express.Router();
var jsonResponse = require('../models/jsonResponse');

/* GET home page. */
router.get('/', function(req, res, next) {
  var obj = new jsonResponse('ok', 200, {data: "flight api default route"});
  res.json(obj).status(obj.status);
});

module.exports = router;
