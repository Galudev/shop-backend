const express = require('express');
const router = express.Router();
const { getFurnitureList, addFurniture } = require('../controllers/furniture');

router.get('/', getFurnitureList);
router.post('/new', addFurniture);

module.exports = router;