var express = require('express');
var router = express.Router();
var accessPermissionController = require('../controllers/accessPermissionController.js');

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
router.get('/', authenticateToken, accessPermissionController.list);
router.get('/accessPermissions', authenticateToken, accessPermissionController.list);

/*
 * GET
 */
router.get('/:id', authenticateToken, accessPermissionController.list);
router.get('/accessPermissions/:id', authenticateToken, accessPermissionController.list);
/*
 * POST
 */
router.post('/', authenticateToken, accessPermissionController.create);
router.post('/:id', authenticateToken, accessPermissionController.create);
/*
 * PUT
 */
router.put('/:id', authenticateToken, accessPermissionController.update);

/*
 * DELETE
 */
router.delete('/:id', authenticateToken, accessPermissionController.remove);

module.exports = router;
