var AccesspermissionModel = require('../models/accessPermissionModel.js');
var UserModel = require('../models/userModel.js');

/**
 * accessPermissionController.js
 *
 * @description :: Server-side logic for managing accessPermissions.
 */
module.exports = {
    
    /**
     * accessPermissionController.list()
     */
    list: function (req, res) {
        var id = req.params.id;
        AccesspermissionModel.find({idParcelLocker: id},function (err, accessPermissions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessPermission!'+id,
                    error: err
                });
            }

            return res.json(accessPermissions);
        }).populate("idUser");
    },

    /**
     * accessPermissionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AccesspermissionModel.findOne({_id: id}, function (err, accessPermission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessPermission.',
                    error: err
                });
            }

            if (!accessPermission) {
                return res.status(404).json({
                    message: 'No such accessPermission'
                });
            }

            return res.json(accessPermission);
        }).populate("idUser");
    },

    /**
     * accessPermissionController.create()
     */
    create: function (req, res) {

        UserModel.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

        var accessPermission = new AccesspermissionModel({
			idParcelLocker : req.body.idParcelLocker,
			idUser : user._id,
			accessableFrom : req.body.accessableFrom,
			accessableTo : req.body.accessableTo
        });

        accessPermission.save(function (err, accessPermission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating accessPermission',
                    error: err
                });
            }

            return res.status(201).json(accessPermission);
        });
    });
    },

    /**
     * accessPermissionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AccesspermissionModel.findOne({_id: id}, function (err, accessPermission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting accessPermission',
                    error: err
                });
            }

            if (!accessPermission) {
                return res.status(404).json({
                    message: 'No such accessPermission'
                });
            }

            var username = req.body.username;
            UserModel.findOne({$or:[{username: username}, {username: username}]}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: 'Napačen uporabniški račun'
                    });
                }

                accessPermission.idUser = user._id;
                accessPermission.accessableFrom = req.body.accessableFrom ? req.body.accessableFrom : accessPermission.accessableFrom;
                accessPermission.accessableTo = req.body.accessableTo ? req.body.accessableTo : accessPermission.accessableTo;

                accessPermission.save(function (err, accessPermission) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating accessPermission.',
                            error: err
                        });
                    }

                    return res.json(accessPermission);
                });

            });


        });
    },

    /**
     * accessPermissionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AccesspermissionModel.findByIdAndRemove(id, function (err, accessPermission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the accessPermission.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
