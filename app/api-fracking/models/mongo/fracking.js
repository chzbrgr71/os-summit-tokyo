
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var frackingSchema = new Schema({
    type: String,
    properties: mongoose.Schema.Types.Mixed

});

mongoose.model('Fracking', frackingSchema, 'fracking');