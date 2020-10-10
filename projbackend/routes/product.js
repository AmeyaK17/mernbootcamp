const express = require("express");
const router = express.Router();

const {isAdmin, isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getProductById, createProduct} = require("../controllers/product");

//All of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//All of actual routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;
