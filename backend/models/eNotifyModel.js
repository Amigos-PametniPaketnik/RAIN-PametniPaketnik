var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eNotifySchema = new Schema({
	'title' : String,
	'content' : String
});

module.exports = mongoose.model('eNotify', eNotifySchema);
