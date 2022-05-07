var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'password' : String,
	'name' : String,
	'lastname' : String,
	'email' : String
});

module.exports = mongoose.model('user', userSchema);
