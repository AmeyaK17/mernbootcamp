require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(process.env.DATABASE, 
{                                    //This is an object
    useNewUrlParser: true,
    useUnifiedToplogy: true,
    useCreateIndex: true,
}).then(() => {  // run().then().catch() -> mongoose.connect is run(), after that then() which is just like try()
    console.log("DB Connected!");
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})
