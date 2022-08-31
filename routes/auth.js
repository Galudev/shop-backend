const express = require('express');
const router = express.Router();
const { newUser, loginUser, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/new', newUser);
router.post('/', loginUser);
router.get('/renew', validarJWT, revalidarToken)
module.exports = router;