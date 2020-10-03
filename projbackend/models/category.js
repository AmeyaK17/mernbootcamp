const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
    }
}, {
    timestamps: true   // will keep track of exact time at which the entry was created. Cann use this to filter out results for a particular time event
})

module.exports = mongoose.model("Category", categorySchema);