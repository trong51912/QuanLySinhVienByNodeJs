var express = require('express');
var router = express.Router();
var coursesController = require('../controller/course.controller');



router.get('/courses', coursesController.getCourses);
// Create 
router.get('/courses/add-course', coursesController.getCourseCreate);
router.post('/courses/add-course', coursesController.postCourseCreate);
// Detail 
router.get('/courses/detail/:courseId' ,coursesController.getCourseDetail);

// Update 
router.get('/courses/update-course/:id', coursesController.getCourseUpdate);
router.post('/courses/update-course/:id', coursesController.postCourseUpdate);
// Delete 
router.get('/courses/delete/:id',coursesController.getDelete);
router.post('/courses/delete/:id',coursesController.postDelete);

module.exports = router;