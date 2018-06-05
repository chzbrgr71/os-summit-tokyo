var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var async = require('async');

/* GET current flight listing. */
router.get('/current', function (req, res, next) {

  var options = {
    uri: 'https://opensky-network.org/api/states/all',
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  };


  rp(options)
    .then(function (data) {
      //var input = JSON.parse(data);
      //console.log(input.states);
      buildGeoJson(data, function (obj) {
        //console.log(data.series);
         res.json(obj).status(200);
      })
      //res.json(data).status(200);
    })
    .catch(function (err) {
      res.json({ 'error': err }).status(500);
    });

});

function buildGeoJson(data, cb) {
  console.log('Processing files for ', data.states.length);
  var rawFlights = data.states;
  var outputFlights = [];
  async.each(rawFlights, function (flight, callback) {

    // Perform operation on file here.
    console.log('Processing file ' + flight);

    if (flight[8] || flight[5] === null) {
      console.log('Flight on ground, ignoring');
      callback();
    } else {
      // Do work to process file here
      var feature = { 
        type: 'Feature',
        properties: {
          FlightNumber:flight[1], 
          Altitude:flight[7], 
          AirSpeed:flight[9],
          Heading:flight[10]
        },
        geometry: { 
          type: 'Point',
          coordinates:[ flight[5], flight[6] ]
        }
      };
      outputFlights.push(feature);
      console.log('File processed');
      callback();
    }
  }, function (err) {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
      console.log(outputFlights.length);
      cb(outputFlights);
    }
  });
}

module.exports = router;
