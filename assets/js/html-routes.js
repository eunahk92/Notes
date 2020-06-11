const path = require("path");
const fs = require("fs");

module.exports = app => {
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../html/notes.html"));
    });

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
            if (err) throw err;
            return res.json(JSON.parse(data));
        });
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../html/index.html"));
    });
}