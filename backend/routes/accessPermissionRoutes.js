var express = require('express');
var router = express.Router();
var accessPermissionController = require('../controllers/accessPermissionController.js');

/*
 * GET
 */
router.get('/', accessPermissionController.list);
router.get('/accessPermissions', accessPermissionController.list);

/*
 * GET
 */
router.get('/:id', accessPermissionController.list);
router.get('/accessPermissions/:id', accessPermissionController.list);
/*
 * POST
 */
router.post('/', accessPermissionController.create);
router.post('/:id', accessPermissionController.create);
/*
 * PUT
 */
router.put('/:id', accessPermissionController.update);

/*
 * DELETE
 */
router.delete('/:id', accessPermissionController.remove);

module.exports = router;
