var express = require('express');
var router = express.Router();
var eNotifyController = require('../controllers/eNotifyController.js');

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
router.get('/', authenticateToken, eNotifyController.list);

/*
 * GET
 */
router.get('/:id', authenticateToken, eNotifyController.show);

/*
 * POST
 */
router.post('/', authenticateToken, eNotifyController.create);

/*
 * PUT
 */
router.put('/:id', authenticateToken, eNotifyController.update);

/*
 * DELETE
 */
router.delete('/:id', authenticateToken, eNotifyController.remove);

module.exports = router;
