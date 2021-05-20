const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//Register New User
router.post('/signup', authController.registerNewUser);

router.post('/login', authController.loginUser);

module.exports = router;
