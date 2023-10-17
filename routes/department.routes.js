var express = require('express');
var router = express.Router();
var departmentController = require('../controller/department.controller');


router.get('/department', departmentController.index);

//CRETAE
router.get('/department/add-department', departmentController.getDepartmentCreate);
router.post('/department/add-department', departmentController.postDepartmentCreate);

//UPDATE
router.get('/department/update-department/:id', departmentController.getDepartmentUpdate);
router.post('/department/update-department/:id', departmentController.postDepartmentUpdate);

//DELETE
router.get('/department/delete-department/:id', departmentController.getDepartmentDelete);
router.post('/department/delete-department/:id', departmentController.postDepartmentDelete);

//DETAIL
router.get('/department/detail-department/:id', departmentController.getDepartmentDetail);


module.exports = router;