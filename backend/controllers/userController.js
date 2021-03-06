var UserModel = require('../models/userModel.js');
var ParcelLockerModel = require('../models/parcelLockerModel');
var AccesspermissionModel = require('../models/accessPermissionModel');
const {spawn} = require('child_process');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

// get config vars
dotenv.config();

function generateAccessToken(username) {
    return jwt.sign({data: username}, 'skrivno', { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "skrivno", (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    });
}

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
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

            return res.json(user);
        });
    },

    /**
     * userController.profile()
     */
    profile: function(req, res,next){
        UserModel.findById(req.session.userId).lean()
            .exec(function(error, user){
                if(error){
                    return next(error);
                } else{
                    if(user===null){
                        var err = new Error('Not authorized, go back!');
                        err.status = 400;
                        return next(err);
                    } else{
                        return res.json(user);
                    }
                }
            });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
			username : req.body.username,
			password : req.body.password,
			name : req.body.name,
			lastname : req.body.lastname,
			email : req.body.email
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.login() -> Login user in web app with basic authentication (username&password)
     */
    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function(err, user){
            if(err || !user){
                var err = new Error('Wrong username or paassword');
                err.status = 401;
                return res.status(401).json({
                    message: 'Napa??no uporabni??ko ime ali geslo!',
                    error: err
                });
            }
            req.session.userId = user._id;
            //res.redirect('/users/profile');
            return res.json(user);
        });
    },

    /**
     * userController.logout()
     */
    logout: function (req, res, next) {
        if(req.session){
            req.session.destroy(function(err){
                if(err){
                    return next(err);
                } else{
                    //return res.redirect('/');
                    return res.status(201).json({});
                }
            });
        }
    },

    /**
     * userController.authenticate() -> Authentication of user in app with basic or biometric (face recognition) auth
     */
    authenticate: function (req, res) {
        if (req.body.authtype === "basic") {
            // Authenticate user in classic way (username&password)
            UserModel.authenticate(req.body.username, req.body.password, function(err, user) {
                if(err || !user){
                    var err = new Error('Wrong username or paassword');
                    err.status = 401;
                    return res.status(err.status).json({
                        message: 'Wrong username or paasword',
                        error: err
                    });
                }
                req.session.userId = user._id;
                //res.redirect('/users/profile');
                const token = generateAccessToken(user.username);
                return res.json({
                    success: true,
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    accesstoken: token
                });
            });
        }
        else if (req.body.authtype === "biometric") {
            // Authenticate user in biometric way (face recognition with deep learning)
            /* UserModel.findOne({_id: id}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user',
                        error: err
                    });
                } */
                if (req.file.filename === undefined) {
                    return res.status(400).json({
                        message: 'With biometric authentication need to be also send a picture in jpg or png format to verify user'
                    });
                }
                console.log("Biometri??na prijava!");
                /* return res.json({
                    success: true
                }); */
                var resultOfIndentification;
                const python = spawn("docker", ["run","-i", "-v", "$(pwd)/uploads/:/app/images/", "-v", "$(pwd)/trainfaces/:/app/faces/", "-v", "$(pwd)/featuresmodels/:/app/featuresmodels/", "c05b28c99f51", "0", req.file.filename], {cwd: "biometricauth/", shell: true });
                // Collect result of indentification of user based on image
                python.stdout.on('data', (data) => {
                    console.log(data.toString());
                    console.log("Pridobivam rezultate indentifikacije osebe po obrazu...");
                    resultOfIndentification = data;
                });
                // Indentification of user in python script ended successfully or with error and closed
                python.on('close', (code) => {
                    console.log(code.toString());
                    console.log("Obraz zaznan osebe z labelo: " + resultOfIndentification);
                    UserModel.findOne({label: resultOfIndentification}, function (err, user) {
                        if (err || !user) {
                            return res.json({
                                success: false
                            });
                        }
                        const token = generateAccessToken(user.username);
                        console.log(user);
                        return res.json({
                            success: true,
                            id: user._id,
                            username: user.username,
                            name: user.name,
                            lastname: user.lastname,
                            email: user.email,
                            accesstoken: token
                        });

                    });
                }); 
           /* }); */
        }
        else {
            return res.status(400).json({
                message: 'You can use only basic and biometric authentication',
            });
        }
    },

    /**
     * userController.checkPremissionToOpen()
     */
    checkPremissionToOpen: function name(req, res) {
        console.log("Prejeto: " + req.body.idParcelLocker);
        var id = req.params.id;

        ParcelLockerModel.findOne({numberParcelLocker: req.body.idParcelLocker, owner: id}).lean().exec(function (err, parcelLocker) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when checking premissions for opener as owner',
                    error: err
                });
            }

            if (!parcelLocker) {  
                AccesspermissionModel.findOne({idParcelLocker: req.body.idParcelLocker, idUser: id}).populate("idParcelLocker").exec(function (err, accessPermission) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when checking premissions for opener as owner',
                            error: err
                        });
                    }
                    if (!accessPermission) {
                        return res.json({
                            premission: false
                        });
                    }
                    return res.json(accessPermission);
                });
            }
            else {
                parcelLocker.idParcelLocker = parcelLocker._id;
                console.log(parcelLocker);
                return res.json(parcelLocker);
            }
        })
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.password = req.body.password ? req.body.password : user.password;
			user.name = req.body.name ? req.body.name : user.name;
			user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
			user.email = req.body.email ? req.body.email : user.email;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
