
var mongoose = require('mongoose');
// class {ID , Classname , SinhVienID }

var courseSchema = mongoose.Schema (
    {   
        courseId: String ,
        name: String,
        teacherName: String,
        des: String,
        image : String ,
        isDeleted: false,
    }
  );

var CoursesModel = module.exports = mongoose.model('Course', courseSchema);
module.exports.get = function(callback, limit){
    CoursesModel.find(callback).limit(limit);
}
