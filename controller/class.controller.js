// import Model
const StudentList = require("../models/student.models");
const ClassList = require("../models/class.models");
const DepartmentList = require("../models/departments");

const classes = {
  //GET LIST STUDENT
  index: async (req, res, next) => {
  console.log("LIST CLASS");
  
  const model = {};
  model.students = await StudentList.find({isDeleted: false}).lean()
  model.departments = await DepartmentList.find({isDeleted: false}).lean();
  model.classes = await ClassList.find({isDeleted: false}).lean();
  
  res.render('class/list-class', model);
  },

  //GET CREATE CLASS
  getClassCreate: async (req, res, next) => {
    console.log("CREATE CLASS");
    var model = {};
    model.data = await DepartmentList.find({isDeleted: false}).lean();
    res.render("./class/add-class", model);
  },

  //POST CREATE CLASS
  postClassCreate: async(req, res, next) => {
    var data = new ClassList();
    data.name = req.body.name;
    data.teacher = req.body.teacher;
    data.numOfStudent = 0;
    data.departmentId = req.body.departmentId;
    data.isDeleted = false;
    data.save(function (err) {
      console.log(err); 
      res.redirect('/class');
    });
  },

  //GET DETAIL CLASS
  getClassDetail: async (req, res, next) => {
    const ID = req.params.id;
    const model = {};
    model.classes = await ClassList.findById(ID).lean();
    model.students = await StudentList.find({isDeleted: false}).lean();
    model.departments = await DepartmentList.find({isDeleted: false}).lean();
    res.render("./class/detail-class", model);
    console.log(model);
  },


  //GET UPDATE
  getClassUpdate: async (req, res) => {
    const ID = req.params.id;
    var model = {};
    model.departments = await DepartmentList.find({isDeleted: false});
    model.classes = await ClassList.findById(ID);
    res.render('./class/update-class', model);
    console.log(model);
  },


  //POST UPDATE
  postClassUpdate: (req, res, next) => {
    const data = {
      name: req.body.name,
  }
  ClassList.update({_id: req.params.id}, data, function(err, raw) {
      if (err) {
          res.send(err);
      }
      res.redirect('/class');
  });
  },


  //GET DELETE
  getClassDelete: (req, res) => {
    const ID = req.params.id;
    ClassList.findById(ID, function (err, resData) {
        console.log(" du lieu query %j", resData);
        res.render('./class/delete-class', {data: resData});
    });
  },

  //POST DELETE
  postClassDelete: (req, res, next) => {
  console.log("chay toi xoa %j", req.params.id);
  ClassList.deleteOne({ _id: req.params.id }, function (err) {
      if(err) console.log(err);
      res.redirect('/class');
    });
  },

  //SEARCH CLASS
  getClassSearch: async (req, res, next) => {
    let searchOptions = {};
    let model = {};
    var inputdata = req.query.keyword;
    if (inputdata != null && inputdata !==''){
      searchOptions.name = new RegExp(inputdata, 'i')
    }
    try {
      model.classes = await ClassList.find(searchOptions);
      model.departments = await DepartmentList.find({isDeleted: false});
      res.render('./class/search-class', model);
      console.log(model)
    } catch {
      res.redirect('/class')
    }
  }
  
};
  
module.exports = classes;