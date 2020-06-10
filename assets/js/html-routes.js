const path = require("path");
const fs = require("fs");

module.exports = function(app) {
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../html/notes.html"));
    });

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", function(err, data) {
            return res.json(JSON.parse(data));
        });
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../html/index.html"));
    });
}