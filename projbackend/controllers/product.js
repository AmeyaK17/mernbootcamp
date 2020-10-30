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
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Saving tshirt in DB failed",
                })
            }

            res.json(product);
        })
    });

};

exports.getProduct = (req, res) => {
    //req.product has the details about the product already from the getProductById() method
    req.product.photo = undefined //get request will be burdened to load the data of the photo
    return res.json(req.product)
}

//We only returned everything, expect for the photo. So we want to load the photo simultaneously in the background.
//So, we will use a middleware

//Middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product",
            });
        }

        res.json({
            message: "Deletion was a success",
            deletedProduct
        });
    });
};

//update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;  //to know the extension of the files, like jpeg or png

    form.parse(req, (err, fields, file) => {  //gives 3 parameters, error, fields, forms
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //updation code
        let product = req.product;
        product = _.extend(product, fields) //value of fields will get into product. This is the job of lodash

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
                    error: "Updation of product failed",
                })
            }

            res.json(product);
        })
    });
}

//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8; //req.query takes input from user. It has "?" in the url. Whenever there is ?, a qury is fired up
    let sortBy = req.quer.sortBy ? req.quer.sortBy : "_id";

    Product.find()
        .select("-photo") // - (minus) sign indicates don't select that
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: "No product found",
                })
            }

            res.json(products);
        })
};

exports.getAllUniqueCategories =(req, res) => {
    Product.distint("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }

        res.json(category);
    });
};

//Can also write two separate middle wares to decrease the stock values, the another to increase the sold value, in this particular order. But bulkWrite() method can also be used here. As the name suggests, it does more than one operation at a time.
//This is a middleware
exports.updateStock = (req, res, next) => {

    //myOperations will be passed on to the bulkWrite() method. bulkWrite() is a mongoose method.
    let myOperations = req.body.order.product.map(prod => {   // We have many orders. From those orders we are going to get all the products. Then we are going to loop through those products by map().
        return {  // returns an object, because bulkWrite() method need the first parameter to be an object
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}} //count will be provided from the front-end. Stock is going down (-), and sold is going up (+)
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }

        next()
    })
}