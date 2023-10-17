var express = require('express');
var router = express.Router();
var classController = require('../controller/class.controller');


router.get('/class', classController.index);

//CRETAE
router.get('/class/add-class', classController.getClassCreate);
router.post('/class/add-class', classController.postClassCreate);

//UPDATE
router.get('/class/update-class/:id', classController.getClassUpdate);
router.post('/class/update-class/:id', classController.postClassUpdate);

//DELETE
router.get('/class/delete-class/:id', classController.getClassDelete);
router.post('/class/delete-class/:id', classController.postClassDelete);

//DETAIL
router.get('/class/detail-class/:id', classController.getClassDetail);

// //SEARCH
router.get('/class/search-class', classController.getClassSearch); 


module.exports = router;