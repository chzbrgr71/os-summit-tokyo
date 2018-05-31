
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var earthquakeSchema = new Schema({
    type: String,
    properties: mongoose.Schema.Types.Mixed

});

mongoose.model('Earthquake', earthquakeSchema, 'earthquakes');