var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
const jwt = require("jsonwebtoken");

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
router.get('/', userController.list);
router.get('/profile', requiresLogin, userController.profile);

/*
 * GET
 */
router.get('/:id', userController.show);
router.get('/logout', userController.logout);

/*
 * POST
 */
router.post('/', userController.create);
router.post('/login', userController.login); // User login in for React web app
router.post('/authenticate', userController.authenticate); // Authenticate usear in app with basic or biometric authorization

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
