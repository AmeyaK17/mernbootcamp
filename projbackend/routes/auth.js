var express = require('express');
const { check, validationResult} = require('express-validator');
var router = express.Router()

const {signout, signup, signin, isSignedIn} = require("../controllers/auth.js")

router.post("/signup", [  //array of validatores on the /signup route
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }), // can also use .withMessage() method for the message, instead of passing it with check()
    check("email", "email is required").isEmail(),
    check("password", "password shoould be atleast 3 char").isLength({min: 3}),
], signup);

router.post("/signin", [  //array of validatores on the /signup route
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({min: 1}),
], signin);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
})

module.exports = router;  //throw router out of this file