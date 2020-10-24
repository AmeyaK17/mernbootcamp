require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//DB Connection
mongoose.connect(process.env.DATABASE, 
{                                    //This is an object
    useNewUrlParser: true,
    useUnifiedToplogy: true,
    useCreateIndex: true,
}).then(() => {  // run().then().catch() -> mongoose.connect is run(), after that then() which is just like try()
    console.log("DB Connected!");
})


//Using middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())


//Routes
app.use("/api", authRoutes);  //Prefixes all our routes with /api
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})
