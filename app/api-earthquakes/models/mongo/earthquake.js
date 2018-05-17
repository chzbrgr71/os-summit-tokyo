
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var earthquakeSchema = new Schema({
    type: String,
    properties: mongoose.Schema.Types.Mixed

});

mongoose.model('Earthquake', earthquakeSchema, 'earthquakes');

    /*
    [ {
        "type":"Feature",
        "properties":
            {"mag":5.8,
            "place":"80km N of Visokoi Island, South Georgia and the South Sandwich Islands",
            "time":1526321687900,
            "updated":1526329110661,
            "tz":-120,
            "url":"https://earthquake.usgs.gov/earthquakes/eventpage/us1000e4vp",
            "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000e4vp.geojson",
            "felt":null,
            "cdi":null,
            "mmi":4,
            "alert":"green",
            "status":"reviewed",
            "tsunami":0,
            "sig":518,
            "net":"us",
            "code":"1000e4vp",
            "ids":",us1000e4vp,",
            "sources":",us,",
            "types":",geoserve,losspager,origin,phase-data,shakemap,",
            "nst":null,
            "dmin":5.649,
            "rms":0.84,
            "gap":60,
            "magType":"mb",
            "type":"earthquake",
            "title":"M 5.8 - 80km N of Visokoi Island, South Georgia and the South Sandwich Islands"},
            "geometry":
                {"type":"Point",
                "coordinates":[-27.0974,-55.9788,10]},
                "id":"us1000e4vp"}] 
*/