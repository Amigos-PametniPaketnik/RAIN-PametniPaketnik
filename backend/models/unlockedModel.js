var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var unlockedSchema = new Schema({
	'idParcelLocker' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'parcelLocker'
	},
	'idUser' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'dateTime' : Date,
	'opened' : Boolean
});

module.exports = mongoose.model('unlocked', unlockedSchema);
