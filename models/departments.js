/* viet lai voi db mongodb su dung mongoss */
/* todolist   (id, title, content) */

var mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
    {
        name: String,
        dean: String,
        establishTime: String,
        numOfStudent: Number,
        isDeleted: false,
    }
  );


var DepartmentModel = module.exports = mongoose.model('department', departmentSchema);
module.exports.get = function(callback, limit){
    DepartmentModel.find(callback).limit(limit);
}