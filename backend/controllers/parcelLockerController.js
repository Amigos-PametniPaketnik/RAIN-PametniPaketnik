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
			location : req.body.location,
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

            parcelLocker.location = req.body.location ? req.body.location : parcelLocker.location;
			parcelLocker.owner = req.body.owner ? req.body.owner : parcelLocker.owner;
			
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
