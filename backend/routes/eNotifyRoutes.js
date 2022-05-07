var express = require('express');
var router = express.Router();
var eNotifyController = require('../controllers/eNotifyController.js');

/*
 * GET
 */
router.get('/', eNotifyController.list);

/*
 * GET
 */
router.get('/:id', eNotifyController.show);

/*
 * POST
 */
router.post('/', eNotifyController.create);

/*
 * PUT
 */
router.put('/:id', eNotifyController.update);

/*
 * DELETE
 */
router.delete('/:id', eNotifyController.remove);

module.exports = router;
