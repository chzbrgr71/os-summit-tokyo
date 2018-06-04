
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var weatherSchema = new Schema({
    city: mongoose.Schema.Types.Mixed,
    time: String,
    main: mongoose.Schema.Types.Mixed,
    wind: mongoose.Schema.Types.Mixed,
    clouds: mongoose.Schema.Types.Mixed,
    weather: mongoose.Schema.Types.Mixed

});

mongoose.model('Weather', weatherSchema, 'weather');