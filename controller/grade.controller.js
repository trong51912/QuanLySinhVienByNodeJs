const GradeList = require('../models/grade.model');
const CousersList = require('../models/course.model');
const StudentList = require ('../models/student.models');
const gradeController = {

    // Show List Grade 
    index: async  (req, res  , next) => {
        let gradeData = await GradeList.find()
        res.render('./grade/list-grade', { gradeData: gradeData });
    },
    // Create 
    getGradeCreate: async (req, res , next) => {
        var model = {};
        model.cousers = await CousersList.find({isDeleted: false}).lean();
        model.students = await StudentList.find({isDeleted: false}).lean();
        console.log(model);
        res.render('./grade/add-grade' , model )
    },

    postGradeCreate: (req, res) => {
        var Name = req.body.nameStudent;
        var CK = req.body.diemChuyenCan;
        var TH = req.body.diemThucHanh;
        var CHK = req.body.diemCuoiKy;
        var TK = (CK * 0.1 + TH * 0.4 + CHK * 0.5).toFixed(2);
        var XH = TK >= 5 ? "Đạt" : "Không Đạt";
        var StID = req.body.monHocId;
        var MID = req.body.studentId;

        var gradeData = new GradeList();
        gradeData.nameStudent = Name;
        gradeData.diemChuyenCan = CK;
        gradeData.diemThucHanh = TH;
        gradeData.diemCuoiKy = CHK;
        gradeData.diemTongKet = TK;
        gradeData.xepHang = XH;
        gradeData.monHocId = StID;
        gradeData.studentId = MID;
        console.log(gradeData);
        gradeData.save(function (err) {
            console.log(err);
            res.redirect('/grade');
        });
    },

    // UPDATE 
    getGradeUpdate: (req, res) => {
        const ID = req.params.id;
        GradeList.findById(ID, function (err, dataGrade) {
            res.render('./grade/update-grade', { gradeData: dataGrade })
        });
    },


    postGradeUpdate: (req, res, next) => {
        const dataUpdate = {
            nameStudent: req.body.nameStudent,
            diemChuyenCan: req.body.diemChuyenCan,
            diemThucHanh: req.body.diemThucHanh,
            diemCuoiKy: req.body.diemCuoiKy,
            monHocId: req.body.monHocId,
            studentId: req.body.studentId
        };
        dataUpdate.diemTongKet = (dataUpdate.diemChuyenCan * 0.1 + dataUpdate.diemThucHanh * 0.4 + dataUpdate.diemCuoiKy * 0.5).toFixed(2);
        dataUpdate.xepHang = dataUpdate.diemTongKet >= 5 ? "Đạt" : "Không Đạt";

        console.log(dataUpdate);
        GradeList.updateOne({ _id: req.params.id }, dataUpdate, function (err, raw) {
            if (err) {
                res.send(err);
            }
            res.redirect('/grade');
        });
    },
    // DETELE 
    getGradeDelete: (req, res) => {
        const ID = req.body.id;
        GradeList.findById(ID, function (err, dataGrade) {
            res.render('./grade/delete-grade', { gradeData: dataGrade })
        });
    },

    postGradeDelete: (req, res) => {
        GradeList.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
            }

            res.redirect('/grade')
        })
    },
    //  Show List
    getGrade: (req, res) => {
        const Idcouser = req.params.monHocId;
        console.log(Idcouser);
        GradeList.find({ monHocId: Idcouser }, function (err, gradeData) {
            if (err) {
                console.log('co loi');
            } else {
                res.render('./grade/list-grade', { gradeData: gradeData })
            }
        });
    },
    sort: async  (req, res  , next) => {
        let gradeData = await GradeList.find().sort({diemTongKet:-1})
        res.render('./grade/list-grade', { gradeData: gradeData });
    },

};

module.exports = gradeController;