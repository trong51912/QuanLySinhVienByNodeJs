var express = require('express');
const { model } = require('mongoose');
var router = express.Router();
var UserController = require('../controller/users.controller')

//Register
router.get('/register', UserController.getRegister);
router.post('/register', UserController.postRegister);


//Login
router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);

module.exports = router;