var express = require('express');
var router = express.Router();
var unlockedController = require('../controllers/unlockedController.js');
const jwt = require("jsonwebtoken");

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
router.get('/', authenticateToken, unlockedController.list);

/*
 * GET
 */
router.get('/:id', authenticateToken, unlockedController.show);
router.get('/getByParcelLocker/:id', authenticateToken, unlockedController.getUnlocksByParcelLocker);

/*
 * POST
 */
router.post('/', authenticateToken, unlockedController.create);

/*
 * PUT
 */
router.put('/:id', authenticateToken, unlockedController.update);

/*
 * DELETE
 */
router.delete('/:id', authenticateToken, unlockedController.remove);

module.exports = router;
