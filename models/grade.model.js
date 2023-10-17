
var mongoose = require('mongoose'); 


var gradeSchema = mongoose.Schema (
    {
       nameStudent : {
            type : String ,
            require: true 
       },
        diemChuyenCan : {
            type: Number,
            require: true
        },
        diemThucHanh : {
            type: Number,
            require: true
        },
       diemCuoiKy : {
        type: Number,
        require: true
       },
       diemTongKet : {
        type: Number,
       
       },
       xepHang : {
        type: String ,
        
       },
       monHocId  : {
        type: String,
        require: true 
       },
       studentId : {
        type : String ,
        require : true 
       }
        
});

// var GradeList = module.exports = mongoose.model('Grade', gradeSchema);
// module.exports.get = function(callback, limit){
//     GradeList.find(callback).limit(limit);
// }

module.exports = mongoose.model('Grade', gradeSchema);