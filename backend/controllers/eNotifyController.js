var EnotifyModel = require('../models/eNotifyModel.js');

/**
 * eNotifyController.js
 *
 * @description :: Server-side logic for managing eNotifys.
 */
module.exports = {

    /**
     * eNotifyController.list()
     */
    list: function (req, res) {
        EnotifyModel.find(function (err, eNotifys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting eNotify.',
                    error: err
                });
            }

            return res.json(eNotifys);
        });
    },

    /**
     * eNotifyController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        EnotifyModel.findOne({_id: id}, function (err, eNotify) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting eNotify.',
                    error: err
                });
            }

            if (!eNotify) {
                return res.status(404).json({
                    message: 'No such eNotify'
                });
            }

            return res.json(eNotify);
        });
    },

    /**
     * eNotifyController.create()
     */
    create: function (req, res) {
        var eNotify = new EnotifyModel({
			title : req.body.title,
			content : req.body.content
        });

        eNotify.save(function (err, eNotify) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating eNotify',
                    error: err
                });
            }

            return res.status(201).json(eNotify);
        });
    },

    /**
     * eNotifyController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        EnotifyModel.findOne({_id: id}, function (err, eNotify) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting eNotify',
                    error: err
                });
            }

            if (!eNotify) {
                return res.status(404).json({
                    message: 'No such eNotify'
                });
            }

            eNotify.title = req.body.title ? req.body.title : eNotify.title;
			eNotify.content = req.body.content ? req.body.content : eNotify.content;
			
            eNotify.save(function (err, eNotify) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating eNotify.',
                        error: err
                    });
                }

                return res.json(eNotify);
            });
        });
    },

    /**
     * eNotifyController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        EnotifyModel.findByIdAndRemove(id, function (err, eNotify) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the eNotify.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
