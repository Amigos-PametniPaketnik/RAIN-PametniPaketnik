var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var accessPermissionSchema = new Schema({
	'idParcelLocker' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'parcelLocker'
	},
	'idUser' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'accessableFrom' : Date,
	'accessableTo' : Date
});

module.exports = mongoose.model('accessPermission', accessPermissionSchema);
