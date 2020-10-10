const user = require("../models/user");
const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => { //This ia a middleware. The moment it sees a parameter in the url, this method is going to be fired
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB",
            })
        }

        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => { //This will be used more often compared to getUserById()
    //TODO: Get back here for passwords
    req.profile.salt = undefined; //undefined variables will not show up in req.profile, or in browser. They are not undefiend in the db, just in the user's profile
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body}, //$set is for updation
        {new: true, useFindAndModify: false}, //compulsory parameteer to pass on when doing updation
        (err, user) => {
            if(err){  //Did not write !user here bcoz $set will already take care of that, and will give an error. But we can specify it here as well.
                return res.status(400).json({
                    error: "You are not authorized to update this user",
                })
            }

            user.salt = undefined; //undefined variables will not show up in req.profile, or in browser. They are not undefiend in the db, just in the user's profile
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order in this account"
            })
        }

        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    
    let purchases =[]
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        });
    });
    
    //store this in DB
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }

            next()
        }
    )
}

/*exports.getAllUsers = (req, res) => {
    User.find().exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No users found in DB",
            })
        }

        return res.json({
            user,
        })
    });
}*/