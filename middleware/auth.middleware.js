const jwt = require('jsonwebtoken')
const middleware = {

    verifyToken: (req,res,next) => {
        const token =  req.cookies.access_token;
        if(!token) {
            res.json('Token Hết Hạn')
        }
        jwt.verify(token,'loy', (err, user)=> {
            if(err) {
                res.json('bạn Cần đăng nhập')
            }
            req.user = user;
            next()  
        }) 
    },
    verifyUser: (req,res,next)=> {
        middleware.verifyToken(req,res, () => {
            if(req.user.id === req.params.id  ||  req.user.isAdmin){
                next()
            }else {
                res.json('Bạn Cần Đăng Nhập')
            }
        })
    },
    verifyAdmin:  (req,res,next)=> {
        middleware.verifyToken(req,res,next, () => {
            if(req.user.isAdmin){
                next()
            }else {
                res.json('Bạn cần là Admin')
            }
        })
    },
}
module.exports = middleware