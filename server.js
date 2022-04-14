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

app.post("/register", function (req, res) {
    // we check to see if username is available
    usernameQuery = "Select username from registeredUsers where username  = ?"
    conn.query(usernameQuery, [req.body.username], function (err, rows) {
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
            insertUser = "insert into registeredUsers values(?, ?)"
            conn.query(insertUser, [req.body.username, passwordHash], function (err, rows) {
                if (err) {
                    res.json({ success: false, message: "server error" })
                }
                else {
                    res.json({ success: true, message: "user registered" })
                }
            })
        }
    });
})


app.listen(3000, function () {
    console.log("Listening on port 3000...");
});