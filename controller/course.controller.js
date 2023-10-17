const CourseList = require( "../models/course.model");

exports.getCourses = (req , res ) => {
    
    CourseList.get(function(err , courseData) {
        if(err){
            console.log('co loi xay ra');
        }else{
            res.render('./courses/list-course' , {courseData:courseData} );
        } 
    })
   
}
// CREATE 
exports.getCourseCreate = (req , res ) => {res.render('./courses/add-course');}


exports.postCourseCreate = (req , res ) => {
    var courseData = new CourseList();
    courseData.courseId = req.body.courseId;
    courseData.name = req.body.name ;
    courseData.teacherName = req.body.teacherName;
    courseData.des = req.body.des;
    courseData.image = req.body.image ;
    courseData.isDeleted = false ;
    courseData.save(function (err) {
        console.log (err);
        res.redirect('/courses')
    });
}
// DETAIL 
exports.getCourseDetail = (req , res) => {
    const ID = req.params.courseId;
    console.log(ID);
    CourseList.findOne({courseId:ID} , function (err , dataCourse){
        res.render('./courses/detail-course' , {dataCourse : dataCourse});
    });
    
}
// UPDATE 
exports.getCourseUpdate = (req , res ) => {
    const ID = req.params.id;
    CourseList.findById(ID , function (err , dataCourse){
        res.render('./courses/update-course' , {dataCourse : dataCourse});
    });
}

exports.postCourseUpdate = (req , res  , next) => {
    const courseData = {
        courseId : req.body.courseId,
        name : req.body.name ,
        teacherName : req.body.teacherName,
        des : req.body.des
    };
    CourseList.updateOne({_id: req.params.id}, courseData, function(err, raw) {
        if (err) {
            res.send(err);
        }
        res.redirect('/courses');
    });
};
// DELETE 

exports.getDelete = (req , res ) => {
    const ID = req.params.id;
    CourseList.findById(ID, function (err, dataCourse) {
        console.log(" du lieu query %j", dataCourse);
        res.render('./courses/delete-course', {dataCourse: dataCourse});
    }); 
}

exports.postDelete = (req , res) => {
    console.log (req.params.id);
    CourseList.deleteOne({_id: req.params.id} , function (err) {
        if(err)  
            console.log(err );
            res.redirect('/courses');
         
    });
};
