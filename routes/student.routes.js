var express = require('express');
var router = express.Router();
var studentController = require('../controller/student.controller');

router.get('/student',  studentController.index);

//CRETAE
router.get('/student/add-student', studentController.getStudentCreate);
router.post('/student/add-student', studentController.postStudentCreate);

//UPDATE
router.get('/student/update-student/:id', studentController.getStudentUpdate);
router.post('/student/update-student/:id', studentController.postStudentUpdate);

//DELETE
router.get('/student/delete-student/:id', studentController.getStudentDelete);
router.get('/student/delete-student-forever/:id', studentController.getStudentDeleteForever);

//DETAIL
router.get('/student/detail-student/:id', studentController.getStudentDetail);

//DELETED
router.get('/student/deleted-student', studentController.getStudentListDeleted);

// SORT
router.get('/student/sortbyname-student', studentController.getStudentSortByName);

//RESTORE
router.get('/student/restore-student/:id', studentController.getStudentRestore)

//SEARCH
router.get('/student/search-student', studentController.getStudentSearch); 

module.exports = router;