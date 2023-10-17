// import Model
const StudentList = require("../models/student.models");
const ClassList = require("../models/class.models");
const DepartmentList = require("../models/departments");

const department = {
  //GET LIST STUDENT
  index: (req, res, next) => {
    console.log("chay toi day");
    DepartmentList.get(function (err, data) {
      if (err) {
        console.log("co loi xay ra");
      } else {
        res.render("department/list-department", { data: data });
      }
    });
  },

  //GET CREATE STUDENT
  getDepartmentCreate: (req, res, next) => {
    res.render("./department/add-department");
  },

  //POST CREATE STUDENT
  postDepartmentCreate: (req, res, next) => {
    var data = new DepartmentList();
    data.name = req.body.name;
    data.dean = req.body.dean;
    data.establishTime = req.body.year;
    data.isDeleted = false;
    data.save(function (err) {  
      console.log(err);
      res.redirect("/department");
    });
  },

  //GET DETAIL CLASS
  getDepartmentDetail: async (req, res, next) => {
    const ID = req.params.id;
    const model = {};
    model.classes = await ClassList.findById(ID).lean();
    model.students = await StudentList.find({ isDeleted: false }).lean();
    res.render("./department/detail-department", model);
    console.log("This is model", model);
  },

  //GET UPDATE
  getDepartmentUpdate: async (req, res) => {
    const ID = req.params.id;
    // model.departments = await DepartmentList.fint({isDeleted : false});
    DepartmentList.findById(ID, function (err, adventure) {
      res.render("./department/update-department", { data: adventure });
      console.log(adventure);
    });
  },

  //POST UPDATE
  postDepartmentUpdate: (req, res, next) => {
    const data = {
      name: req.body.name,
      dean: req.body.dean,
      establishTime: req.body.year,
      numOfStudent: req.body.num,
    };
    DepartmentList.update({ _id: req.params.id }, data, function (err, raw) {
      if (err) {
        res.send(err);
      }
      res.redirect("/department");
    });
  },

  //GET DELETE
  getDepartmentDelete: (req, res) => {
    const ID = req.params.id;
    DepartmentList.findById(ID, function (err, resData) {
      console.log(" du lieu query %j", resData);
      res.render("./department/delete-department", { data: resData });
    });
  },

  //POST DELETE
  postDepartmentDelete: (req, res, next) => {
    console.log("chay toi xoa %j", req.params.id);
    DepartmentList.deleteOne({ _id: req.params.id }, function (err) {
      if (err) console.log(err);
      res.redirect("/department");
    });
  },
};

module.exports = department;
