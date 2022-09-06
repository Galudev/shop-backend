const express = require('express');
const router = express.Router();
const { addItem, removeItem, updateItem, deleteAll } = require('../controllers/basket');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT);

router.post('/:id', addItem);
router.delete('/:id', removeItem);
router.put('/', updateItem);
router.delete('/', deleteAll);

module.exports = router;