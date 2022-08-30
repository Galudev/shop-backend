const express = require('express');
const router = express.Router();
const { addItem, removeItem, updateItem } = require('../controllers/basket');

router.post('/', addItem);
router.delete('/', removeItem);
router.put('/', updateItem);

module.exports = router;