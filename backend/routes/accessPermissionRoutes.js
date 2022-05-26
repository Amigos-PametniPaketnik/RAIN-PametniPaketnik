var express = require('express');
var router = express.Router();
var accessPermissionController = require('../controllers/accessPermissionController.js');
const cors = require("cors");
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
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
 * GET
 */
router.get('/', corsSettings, accessPermissionController.list);
router.get('/accessPermissions', corsSettings, accessPermissionController.list);

/*
 * GET
 */
router.get('/:id', corsSettings, accessPermissionController.list);
router.get('/accessPermissions/:id', corsSettings, accessPermissionController.list);
/*
 * POST
 */
router.post('/', corsSettings, accessPermissionController.create);
router.post('/:id', corsSettings, accessPermissionController.create);
/*
 * PUT
 */
router.put('/:id', corsSettings, accessPermissionController.update);

/*
 * DELETE
 */
router.delete('/:id', corsSettings, accessPermissionController.remove);

module.exports = router;
