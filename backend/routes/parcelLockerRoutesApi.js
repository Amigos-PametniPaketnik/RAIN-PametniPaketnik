var express = require('express');
var router = express.Router();
var parcelLockerController = require('../controllers/parcelLockerController.js');

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
router.get('/all', authenticateToken, parcelLockerController.list);
router.get('/', authenticateToken, parcelLockerController.myParcelLockers);
/*
 * GET
 */
router.get('/:id', authenticateToken, parcelLockerController.show);

/*
 * POST
 */
router.post('/', authenticateToken, parcelLockerController.create);

/*
 * PUT
 */
router.put('/:id', authenticateToken, parcelLockerController.update);

/*
 * DELETE
 */
router.delete('/:id', authenticateToken, parcelLockerController.remove);

module.exports = router;
