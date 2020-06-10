// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static('./assets/'));

// Routes for pages
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function(err, data) {
        return res.json(JSON.parse(data));
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {
    let note = req.body;
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function(err, data) {
        let notesArr = JSON.parse(data);
        notesArr.push(note);

        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notesArr), function(err, data) {
            return notesArr;
        });
    });
});

app.delete('/api/notes/:id', function (req, res) {
    let id = req.params.id;
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function(err, data) {
        let notesArr = JSON.parse(data);
        for (let i = 0; i < notesArr.length; i++) {
            if (notesArr[i].id === id) {
                notesArr.splice(i, 1);
                fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notesArr), function(err, data) {
                    return notesArr;
                });
            }
        } 
    });
    res.sendFile(path.join(__dirname, "notes.html"));
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});