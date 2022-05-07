var express = require('express');
var router = express.Router();
var parcelLockerController = require('../controllers/parcelLockerController.js');

/*
 * GET
 */
router.get('/', parcelLockerController.list);

/*
 * GET
 */
router.get('/:id', parcelLockerController.show);

/*
 * POST
 */
router.post('/', parcelLockerController.create);

/*
 * PUT
 */
router.put('/:id', parcelLockerController.update);

/*
 * DELETE
 */
router.delete('/:id', parcelLockerController.remove);

module.exports = router;
