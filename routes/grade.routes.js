var express = require('express');
var router = express.Router();
var gradeController = require('../controller/grade.controller');


// shoe list 
router.get('/grade' , gradeController.index)
// show theo mon
router.get('/grade/:monHocId', gradeController.getGrade);
// Sort with DTK
router.get('/sort' , gradeController.sort)
// create 
router.get('/add-grade', gradeController.getGradeCreate);
router.post('/add-grade' , gradeController.postGradeCreate);
// update 
router.get('/grade/update-grade/:id' , gradeController.getGradeUpdate);
router.post('/grade/update-grade/:id' , gradeController.postGradeUpdate);
// delete 
router.get('/grade/delete-grade/:id' , gradeController.getGradeDelete);
router.post('/grade/delete-grade/:id' , gradeController.postGradeDelete);


module.exports = router;