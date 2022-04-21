const express = require("express");
const { json, redirect } = require("express/lib/response");
const mysql = require("mysql2")
const bcrypt = require("bcryptjs")
const costFactor = 10; 

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
app.use(express.urlencoded({ extended: false }));

const proxy = require('pass-cors')
app.use('/proxy', proxy);

app.post("/attempt_login", function(req, res){
    // we check for the username and password to match.
    connection.query("select pw, points from website_user where username = ?", [req.body.username], function (err, rows){
        if(err || rows.length <= 0){
            res.json({success: false, message: "user doesn't exists"});
        } else {
            storedPassword = rows[0].pw // rows is an array of objects e.g.: [ { password: '12345' } ]
            // bcrypt.compareSync let's us compare the plaintext password to the hashed password we stored in our database
            if (bcrypt.compareSync(req.body.password, storedPassword)){
                authenticated = true;
                let points = rows[0].points
                res.json({ success: true, message: "logged in, points: " + points});
            }else{
                res.json({success: false, message:"password is incorrect"})
            }
        }
    })
})

app.post("/register", function (req, res) {
    // we check to see if username is available
    usernameQuery = "Select username from website_user where username = ?"
    connection.query(usernameQuery, [req.body.username], function (err, rows) {
        if (err) {
            res.json({ success: false, message: "server error" })
        }
        // we check to see if the username is already taken
        if (rows.length > 0) {
            res.json({ success: false, message: "username taken" })
        }
        // if it isn't, we insert the user into database
        else {
            // we create a password hash before storing the password
            passwordHash = bcrypt.hashSync(req.body.password, costFactor);
            //console.log(passwordHash)
            insertUser = "insert into website_user values(?, ?, 0)"
            connection.query(insertUser, [req.body.username, passwordHash], function (err, rows) {
                if (err) {
                    res.json({ success: false, message: "server error"})
                }
                else {
                    res.json({ success: true, message: "user registered" })
                }
            })
        }
    });
})


// All the linking of the pages and urls
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


app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
})

app.get("/registration", function (req, res) {
    res.sendFile(__dirname + "/public/" + "registration.html");
})

app.get("/pay", function (req, res) {
    res.sendFile(__dirname + "/public/" + "pay.html");
})

app.get("/gallery", function (req, res) {
    res.sendFile(__dirname + "/public/" + "gallery.html");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
})