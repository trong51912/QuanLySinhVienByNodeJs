var express = require('express');
var router = express.Router();
var controller = require('../controller/index');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');


router.get('/', verifyAdmin, controller.index);



module.exports = router;