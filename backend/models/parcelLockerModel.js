var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var parcelLockerSchema = new Schema({
	'numberParcelLocker' : String,
	'location' : String,
	'owner' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('parcelLocker', parcelLockerSchema);
