const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Hello there");
});

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