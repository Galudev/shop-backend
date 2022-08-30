const express = require('express');
const router = express.Router();
const { newUser, loginUser } = require('../controllers/auth');

router.post('/new', newUser);
router.post('/', loginUser);

module.exports = router;