var ParcellockerModel = require('../models/parcelLockerModel.js');

/**
 * parcelLockerController.js
 *
 * @description :: Server-side logic for managing parcelLockers.
 */
module.exports = {

    /**
     * parcelLockerController.list()
     */
    list: function (req, res) {
        ParcellockerModel.find(function (err, parcelLockers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting parcelLocker.',
                    error: err
                });
            }

            return res.json(parcelLockers);
        });
    },



    myParcelLockers: function (req, res) {
        var id = req.session.userId;
        
        ParcellockerModel.find({owner: id},function (err, parcelLockers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting parcelLocker.',
                    error: err
                });
            }

            return res.json(parcelLockers);
        });
    },

    myParcelLockersApi: function (req, res) {
        var id = req.params.id;
        
        ParcellockerModel.find({owner: id},function (err, parcelLockers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting parcelLocker.',
                    error: err
                });
            }

            return res.json(parcelLockers);
        });
    },
    /**
     * parcelLockerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ParcellockerModel.findOne({_id: id}, function (err, parcelLocker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting parcelLocker.',
                    error: err
                });
            }

            if (!parcelLocker) {
                return res.status(404).json({
                    message: 'No such parcelLocker'
                });
            }

            return res.json(parcelLocker);
        });
    },

    /**
     * parcelLockerController.create()
     */
    create: function (req, res) {
        var parcelLocker = new ParcellockerModel({
            numberParcelLocker : req.body.numberParcelLocker,
            name : req.body.nameParcelLocker,
            description : req.body.description,
            city : req.body.city,
            address : req.body.address,
            postal : req.body.postal,
			location : Object.values(req.body.location),
			owner : req.session.userId
        });

        parcelLocker.save(function (err, parcelLocker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating parcelLocker',
                    error: err
                });
            }

            return res.status(201).json(parcelLocker);
        });
    },

    /**
     * parcelLockerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ParcellockerModel.findOne({_id: id}, function (err, parcelLocker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting parcelLocker',
                    error: err
                });
            }

            if (!parcelLocker) {
                return res.status(404).json({
                    message: 'No such parcelLocker'
                });
            }

            parcelLocker.numberParcelLocker = req.body.numberParcelLocker ? req.body.numberParcelLocker : parcelLocker.numberParcelLocker;
            parcelLocker.name = req.body.nameParcelLocker ? req.body.nameParcelLocker : parcelLocker.name;
            parcelLocker.description = req.body.description ? req.body.description : parcelLocker.description;
            parcelLocker.city = req.body.city ? req.body.city : parcelLocker.city;
            parcelLocker.address = req.body.address ? req.body.address : parcelLocker.address;
            parcelLocker.postal = req.body.postal ? req.body.postal : parcelLocker.postal;
            parcelLocker.location = req.body.location ? req.body.location : parcelLocker.location;
			
            parcelLocker.save(function (err, parcelLocker) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating parcelLocker.',
                        error: err
                    });
                }

                return res.json(parcelLocker);
            });
        });
    },

    /**
     * parcelLockerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ParcellockerModel.findByIdAndRemove(id, function (err, parcelLocker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the parcelLocker.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
