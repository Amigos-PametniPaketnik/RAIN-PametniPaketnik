var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var unlockedSchema = new Schema({
	'idParcelLocker' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'parcelLocker'
	},
	'idUser' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'dateTime' : Date
});

module.exports = mongoose.model('unlocked', unlockedSchema);
