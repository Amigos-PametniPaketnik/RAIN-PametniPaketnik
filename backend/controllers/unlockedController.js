var UnlockedModel = require('../models/unlockedModel.js');
var UserModel = require('../models/userModel');

/**
 * unlockedController.js
 *
 * @description :: Server-side logic for managing unlockeds.
 */
module.exports = {

    /**
     * unlockedController.list()
     */
    list: function (req, res) {
        UnlockedModel.find(function (err, unlockeds) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlocked.',
                    error: err
                });
            }

            return res.json(unlockeds);
        });
    },

    /**
     * unlockedController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UnlockedModel.findOne({_id: id}, function (err, unlocked) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlocked.',
                    error: err
                });
            }

            if (!unlocked) {
                return res.status(404).json({
                    message: 'No such unlocked'
                });
            }

            return res.json(unlocked);
        });
    },

        /**
     * unlockedController.getUnlocksByParcelLocker()
     */
         getUnlocksByParcelLocker(req, res) {
            var idParcelLocker = req.params.id;

            UnlockedModel.find({idParcelLocker: idParcelLocker}).lean().populate("idUser").exec(function (err, unlocked) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting unlocked.',
                        error: err
                    });
                }
    
                if (!unlocked) {
                    return res.status(404).json({
                        message: 'No such unlocked'
                    });
                }
    
                return res.json(unlocked);
            });
        },

    /**
     * unlockedController.create()
     */
    create: function (req, res) {
        var unlocked = new UnlockedModel({
			idParcelLocker : req.body.idParcelLocker,
			idUser : req.body.idUser,
			dateTime : new Date(),
            opened: req.body.opened
        });

        unlocked.save(function (err, unlocked) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating unlocked',
                    error: err
                });
            }

            return res.status(201).json(unlocked);
        });
    },

    /**
     * unlockedController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UnlockedModel.findOne({_id: id}, function (err, unlocked) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlocked',
                    error: err
                });
            }

            if (!unlocked) {
                return res.status(404).json({
                    message: 'No such unlocked'
                });
            }

            unlocked.idParcelLocker = req.body.idParcelLocker ? req.body.idParcelLocker : unlocked.idParcelLocker;
			unlocked.idUser = req.body.idUser ? req.body.idUser : unlocked.idUser;
			unlocked.dateTime = req.body.dateTime ? req.body.dateTime : unlocked.dateTime;
			
            unlocked.save(function (err, unlocked) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating unlocked.',
                        error: err
                    });
                }

                return res.json(unlocked);
            });
        });
    },

    /**
     * unlockedController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UnlockedModel.findByIdAndRemove(id, function (err, unlocked) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the unlocked.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
