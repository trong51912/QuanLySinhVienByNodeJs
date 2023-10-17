const User = require('../models/users.models');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')
const saltRound = 10;
var salt = bcrypt.genSaltSync(saltRound);

//Register
exports.getRegister = (req, res)  => {
   res.render('./users/register')
}

exports.postRegister = (req, res)  => {
    console.log("Du lieu gui len server %j", req.body);
        //Email
        User.findOne({
            email: req.body.email,
        })
        .then((data) => {
            if(data) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
            } else {
                if(req.body.password == req.body.passwordagain) {
                    var data = new User();
                    data.email = req.body.email;
                    data.password = bcrypt.hashSync(req.body.password, salt);
                    data.save(function(err){
                        res.redirect('/login');
                    })
                } else {
                    console.log("password doesn't match");
                    res.redirect('/register');
                }
            }
        }) 
}

//Login
exports.getLogin = (req, res)  => {
    res.render('./users/login')
}
exports.postLogin = (req, res) => {
    User.findOne({email: req.body.email}, function(err, response){
        if(res){
            const checkPass = bcrypt.compareSync(req.body.password, response.password);
            if(checkPass){
                //create
                const payload = {email: response.email, id: response._id};
                const token = jwt.sign(payload, 'loy', { expiresIn: "360s"})
                res.cookie("access_token", token,{
                    httpOnly: true,
                }).status(200).redirect('/')
            }else{
                console.log("Wrong password")
                res.redirect('/login');
            }
        }
    });
}