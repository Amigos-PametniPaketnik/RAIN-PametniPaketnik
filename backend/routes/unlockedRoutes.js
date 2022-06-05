var express = require('express');
var router = express.Router();
var unlockedController = require('../controllers/unlockedController.js');
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
 * GET
 */
router.get('/', corsSettings, unlockedController.list);

/*
 * GET
 */
router.get('/:id', corsSettings, unlockedController.show);
router.get('/getByParcelLocker/:id', corsSettings, unlockedController.getUnlocksByParcelLocker);

/*
 * POST
 */
router.post('/', corsSettings, unlockedController.create);

/*
 * PUT
 */
router.put('/:id', corsSettings, unlockedController.update);

/*
 * DELETE
 */
router.delete('/:id', corsSettings, unlockedController.remove);

module.exports = router;
