const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Hello there");
});


const admin = (req, res) => {
    return res.send("This is admin page")
};

const isAdmin = (req, res, next) => {   //next is defined here. Otherwise, we will get error.
    console.log("isAdmin is running");
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn is running");
    next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);   //isAdmin and isLoggedIn are the middleware. Middlewares are responsible for checking some stuff before giving a response to the user. 








app.listen(port, () => {
    console.log("Server is up and running...");
});

app.get("/login", (req, res) => {
    return res.send("This is login page");
});

app.get("/signup", (req, res) => {
    return res.send("This is signup page");
});

//const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })