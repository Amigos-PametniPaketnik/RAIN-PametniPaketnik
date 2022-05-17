var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

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
