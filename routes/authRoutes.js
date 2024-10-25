const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Task 6
router.post('/login', login);       // Task 7

module.exports = router;
