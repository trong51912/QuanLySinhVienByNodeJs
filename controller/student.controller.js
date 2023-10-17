// import Model
const StudentList = require("../models/student.models");
const ClassList = require("../models/class.models");


const student = {
  //GET LIST STUDENT
  index: async (req, res, next) => {
    console.log("LIST STUDENT");

    const model = {};
    model.students = await StudentList.find({isDeleted: false}).lean();
    model.classes = await ClassList.find({isDeleted: false}).lean();
    res.render('student/list-student', model);
    console.log(model.students.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
  },

  //GET LIST STUDENT SORTBYNAME
  getStudentSortByName: async (req, res, next) => {
    console.log("SORT BY NAME");

    const model = {};
    var filter = await StudentList.find({isDeleted: false}).lean()
    filter.sort(function(a, b){
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())}
    );

    model.students = filter;
    model.classes = await ClassList.find({isDeleted: false}).lean();
    res.render('student/list-student', model);
  },

  //GET CREATE STUDENT
  getStudentCreate: async (req, res, next) => {
    console.log("CREATE STUDENT");

    data = await ClassList.find({isDeleted: false}).lean();
    
    res.render("./student/add-student", data);
  },

  //POST CREATE STUDENT
  postStudentCreate: async (req, res, next) => {
    const createData = {  
      name: req.body.name,
      classId: req.body.class,
      gender: req.body.gender,
      dob: req.body.dob,
      phone: req.body.phone,
      address: req.body.address,
      isDeleted: false
    };

    if (req.file && req.file.filename) {
      createData.photo = req.file.filename;
    }

    //Update so sinh vien
    const classes = await ClassList.find({isDeleted: false});
    classes.forEach(async (i)=>{
      if(i._id.toString()===req.body.class){
        var num = i.numOfStudent+1;
        await ClassList.update({_id: i._id},{numOfStudent: num})
      }
    })

    await StudentList.create(createData);
    res.redirect('/student');

    console.log("CREATE STUDENT SUCCESSFULLY!")
  },


  //GET DETAIL
  getStudentDetail: (req, res, next) => {
    console.log("DETAIL STUDENT");

    const ID = req.params.id;
    StudentList.findById(ID, function (err, adventure) {
      res.render("./student/detail-student", {data: adventure});
    });
  },


  //GET UPDATE
  getStudentUpdate: async(req, res) => {
    console.log("UPDATE STUDENT");

    const ID = req.params.id;
    var model = {};
    model.students = await StudentList.findById(ID);
    model.classes = await ClassList.find({isDeleted: false}).lean();
    
    res.render('./student/update-student', model);
  },


  //POST UPDATE
  postStudentUpdate: (req, res, next) => {
    const data = {
      name: req.body.name,
      class: req.body.class,
      gender: req.body.gender,
      dob: req.body.dob,
      phone: req.body.phone,
      address: req.body.address
    }
    StudentList.update({_id: req.params.id}, data, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.redirect('/student');
    });
    console.log("UPDATE STUDENT SUCCESSFULLY!");
  },


  //GET DELETE
  getStudentDelete: async(req, res) => {
    const ID = req.params.id;
    const docStudent = await StudentList.findOne(
      {
        _id: ID,
        isDeleted: false
      }
    ).lean();
    
    if (!docStudent || !docStudent._id) {
      console.log("Tham Số Đầu Vào Không Hợp Lệ");
      res.redirect('/student');
    } else {
      await StudentList.update({_id: docStudent._id},{isDeleted: true});

      //Update so sinh vien
      const classes = await ClassList.find({isDeleted: false});
      classes.forEach(async (i)=>{
      if(i._id.toString()===docStudent.classId){
        var num = i.numOfStudent-1;
        await ClassList.update({_id: i._id},{numOfStudent: num})
      }
    })
      console.log("DELETE STUDENT SUCCESSFULLY!");
    }
  
    res.redirect('/student');
  },

  //GET DELETE
  getStudentDeleteForever: (req, res, next) => {
    StudentList.deleteOne({ _id: req.params.id }, function (err) {
        if(err) console.log(err);
      });
      console.log("DELETE STUDENT SUCCESSFULLY!")
      res.redirect('/student/deleted-student');
  },

  //GET RESTORE
  getStudentRestore: async (req, res, next) => {
    const ID = req.params.id;
    const docStudent = await StudentList.findOne(
      {
        _id: ID,
        isDeleted: true
      }
    ).lean();
    
    if (!docStudent || !docStudent._id) {
      console.log("Tham Số Đầu Vào Không Hợp Lệ");
      res.redirect('/student');
    } else {
      await StudentList.update({_id: docStudent._id},{isDeleted: false});

      //Update so sinh vien
      const classes = await ClassList.find({isDeleted: false});
      classes.forEach(async (i)=>{
      if(i._id.toString()===docStudent.classId){
        var num = i.numOfStudent+1;
        await ClassList.update({_id: i._id},{numOfStudent: num})
      }
    })
      console.log("RESTORE STUDENT SUCCESSFULLY!");
    }
  
    res.redirect('/student/deleted-student');
  },


  //GET LIST STUDENT DELETED
  getStudentListDeleted: async (req, res, next) => {
    console.log("LIST STUDENT DELETED");

    const model = {};
    model.students = await StudentList.find({isDeleted: true}).lean();
    model.classes = await ClassList.find({isDeleted: false}).lean();

    res.render('student/list-student-deleted', model);
  },


  //GET SEARCH
  getStudentSearch: async (req, res, next) => {
    let searchOptions = {};
    let model = {};
    var inputdata = req.query.keyword;
   if (inputdata != null && inputdata !==''){
     searchOptions.name = new RegExp(inputdata, 'i')
   }
   try{
     model.result = await StudentList.find(searchOptions);
     model.classes = await ClassList.find({isDeleted: false});
     res.render('./student/search-student', model);
     console.log(model)
   }catch{
     res.redirect('/student')
   }
  }

};


module.exports = student;
