const User = require("../models/user"); //User same as User from models.user.js
const { use } = require("../routes/auth");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");


exports.signup =(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }


    const user = new User(req.body);  // created object user of type User
    user.save((err, user) => {  // since user is object of User, and User is further defiend from User using mongoose, current user has all methods of mongoose, i.e. .save() method
        if(err){
            return res.status(400).json({  // status 400 means "Bad Respone" (just like "Error 404".) .json() is used to make things easier for front-end dev to make changes to the msg in future.
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            _id: user._id,
        });
    })
}

exports.signin = (req, res) => {
    const errors = validationResult(req)
    const {email, password} = req.body;  //also known as destructuing of data. In the body object, name is name, email is email and so on
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({email}, (err, user) => {  //findOne() method from mongodb
        if(err || !user){
            return res.status(400).json({
                error: "USER email doesn't exits"
            })        
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match",
            })
        }

        //Create authentication token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //Put this token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //send respone to frontend
        const {_id, name, email, role} = user;
        return res.json({
            token,
            user: {_id, name, email, role},
        })
    })
};

exports.signout = (req, res) => {
    
    res.clearCookie("token"); //.clearCookie() method was availabe because of cookieParser()
    
    res.json({
        message: "User signout successfully"
    })
}


//protected routes // Also is checker for token
exports.isSignedIn = expressJwt({   //(middleware form express. No need to write next() for this middleware, because expressJwt() already has it
    secret: process.env.SECRET,
    userProperty: "auth"
});


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id; //.profile will be set from front-end

    if(!checker){
        return res.status(403).json({
            error: "Access Denied",
        });
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not admin",
        });
    }

    next();
}