var mongoose = require("mongoose");

var studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
  },
    classId: {
      type: String,
      require: true,
  },
    gender: {
    type: String,
    require: true,
  },
    dob: {
    type: String,
    require: true,
  },
    phone: {
    type: String,
    require: true,
  },
    address: {
    type: String,
    require: true,
  },
    photo: {
      type: String,
      require: true,
    },
    isDeleted: false
  },
  { timestamps: true}
);


var StudentModel = (module.exports = mongoose.model("Students", studentSchema));
module.exports.get = function (callback, limit) {
  StudentModel.find(callback).limit(limit);
};
