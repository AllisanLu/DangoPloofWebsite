const express = require("express");
const { json } = require("express/lib/response");
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wahaha!!",
    database: "dangoploof"
});

connection.connect(function (err) {
    if (err) {
        console.log("Error connecting to MySQL", err);
    } else {
        console.log("Connection established");
    }
});

const app = express();
app.use(express.static("public"));

app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get("/about", function (req, res) {
    res.sendFile(__dirname + "/public/" + "about.html");
})

app.get("/commissions", function (req, res) {
    res.sendFile(__dirname + "/public/" + "commissions.html");
})

app.get("/shop", function (req, res) {
    res.sendFile(__dirname + "/public/" + "shop.html");
})

app.listen(3000, function () {
    console.log("Listening on port 3000...");
});