var express = require('express');
var router = express.Router();
var parcelLockerController = require('../controllers/parcelLockerController.js');
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
router.get('/all', corsSettings, parcelLockerController.list);
router.get('/', corsSettings, parcelLockerController.myParcelLockers);
/*
 * GET
 */
router.get('/:id', corsSettings, parcelLockerController.show);

/*
 * POST
 */
router.post('/', corsSettings, parcelLockerController.create);

/*
 * PUT
 */
router.put('/:id', corsSettings, parcelLockerController.update);

/*
 * DELETE
 */
router.delete('/:id', corsSettings, parcelLockerController.remove);

module.exports = router;
