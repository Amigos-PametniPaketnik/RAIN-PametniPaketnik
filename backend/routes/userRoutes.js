var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
const jwt = require("jsonwebtoken");
const cors = require("cors");
var allowedOrigins = ['http://snf-58216.vm.okeanos-global.grnet.gr:3000', 'http://snf-58216.vm.okeanos-global.grnet.gr:3001'];
const corsSettings = cors({
    credentials: true,
    origin: function(origin, callback){
        // Allow requests with no origin (mobile apps, curl)
        //if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin)===-1){
            var msg = "The CORS policy does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
});

/*
* Allow access to endpoint only logged in users
 */
function requiresLogin(req,res,next){
    console.log("auth!");
    if(req.session && req.session.userId){
        return next();
    } else {
        var err = new Error("You must be logged in to view this page.");
        err.status = 401;
        return next(err);
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, "skrivno", (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    });
}

/*
 * GET
 */
router.get('/', corsSettings, userController.list);
router.get('/profile', corsSettings, userController.profile);

/*
 * GET
 */
router.get('/:id', corsSettings, userController.show);
router.get('/logout', corsSettings, userController.logout);

/*
 * POST
 */
router.post('/', corsSettings, userController.create);
router.post('/login', corsSettings, userController.login); // User login in for React web app
router.post('/authenticate', corsSettings, userController.authenticate); // Authenticate usear in app with basic or biometric authorization

/*
 * PUT
 */
router.put('/:id', corsSettings, userController.update);

/*
 * DELETE
 */
router.delete('/:id', corsSettings, userController.remove);

module.exports = router;
