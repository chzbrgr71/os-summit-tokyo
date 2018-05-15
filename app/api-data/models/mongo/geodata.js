
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var geodataSchema = new Schema({
    geodata: mongoose.Schema.Types.Mixed
});

mongoose.model('Geodata', geodataSchema, 'geodata');