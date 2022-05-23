var express = require('express');
var router = express.Router();
var unlockedController = require('../controllers/unlockedController.js');

/*
 * GET
 */
router.get('/', unlockedController.list);

/*
 * GET
 */
router.get('/:id', unlockedController.show);
router.get('/getByParcelLocker/:id', unlockedController.getUnlocksByParcelLocker);

/*
 * POST
 */
router.post('/', unlockedController.create);

/*
 * PUT
 */
router.put('/:id', unlockedController.update);

/*
 * DELETE
 */
router.delete('/:id', unlockedController.remove);

module.exports = router;
