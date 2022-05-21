var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var parcelLockerSchema = new Schema({
	'numberParcelLocker' : String,
	'name' : String,
	'description' : String,
	'city' : String,
	'address' : String,
	'postal' : Number,
	'location' : String,
	'owner' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('parcelLocker', parcelLockerSchema);
