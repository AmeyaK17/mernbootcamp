const Product = require("../models/product");
const formidable = require("formidable"); // to create and use forms instead of json response
const _ = require("lodash"); //lodash is used for checking some basic ds contents for the program. const _ denots that it is a private varibale and will not be used often
const fs = require("fs"); //fs = file system, for path to store files, images

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")  //get products based on category
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found",
            })
        }

        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;  //to know the extension of the files, like jpeg or png

    form.parse(req, (err, fields, file) => {  //gives 3 parameters, error, fields, forms
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //destructure the fields
        //const {price} = fields //is equal to fields.price
        const {price, description, name, category, stock} = fields;

        //add restriction. Can do it on routes, like other, but we can also have additional layer here
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){ // check if file is greater than 3mb. Approx 2*(1024*1024)
                return res.status(400).json({
                    error: "File size too big!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path); //to find the path of the file
            product.photo.contentType = file.photo.type;
        }

        //console.log(product);

        //save to DB
        product.save(err, product => {
            if(err){
                return res.status(400).json({
                    error: "Saving tshirt in DB failed",
                })
            }

            res.json(product);
        })
    });

};