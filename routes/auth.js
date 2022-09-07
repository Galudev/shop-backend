const express = require('express');
const router = express.Router();
const { newUser, loginUser, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const regexPassword = /["<>]/;

router.post('/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El formato de la contraseña es erróneo').isStrongPassword().not().matches(regexPassword),
        validarCampos
    ],
    newUser);
router.post('/',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El formato de la contraseña es erróneo').isStrongPassword().not().matches(regexPassword),
        validarCampos
    ],
    loginUser);
router.get('/renew', validarJWT, revalidarToken)
module.exports = router;