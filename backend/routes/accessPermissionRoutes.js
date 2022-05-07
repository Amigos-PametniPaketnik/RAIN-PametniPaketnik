var express = require('express');
var router = express.Router();
var accessPermissionController = require('../controllers/accessPermissionController.js');

/*
 * GET
 */
router.get('/', accessPermissionController.list);

/*
 * GET
 */
router.get('/:id', accessPermissionController.show);

/*
 * POST
 */
router.post('/', accessPermissionController.create);

/*
 * PUT
 */
router.put('/:id', accessPermissionController.update);

/*
 * DELETE
 */
router.delete('/:id', accessPermissionController.remove);

module.exports = router;
