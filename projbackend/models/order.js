const mongoose =  require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },

    name: String, 
    count: Number,
    price: Number,
});

const ProductCart =  mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema =  new mongoose.Schema({
    product: [ProductCartSchema],  // Can use ObjectId as well, but this is another way of doing it! Usually when 2 schemas are in same folder

    transaction_id: {},

    amount: {
        type: Number,
    },

    address: String, 

    updated: Date, 

    user: {
        type: ObjectId,
        ref: "User",
    }

}, {
    timestamps: true   // will keep track of exact time at which the entry was created. Cann use this to filter out results for a particular time event
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = {Order, ProductCart}; //Exporting multiple schemas at once