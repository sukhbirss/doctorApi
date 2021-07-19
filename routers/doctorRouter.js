const express = require('express');
const doctorController = require('./../controllers/doctorController');

const router = express.Router();
router.post('/signup',doctorController.signup);
router.post('/login',doctorController.login);

module.exports = router;