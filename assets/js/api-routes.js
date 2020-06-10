const path = require("path");
const fs = require("fs");

module.exports = function(app) {
    app.post("/api/notes", function (req, res) {
        let note = req.body;
        fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", function(err, data) {
            let notesArr = JSON.parse(data);
            notesArr.push(note);
    
            fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notesArr), function(err, data) {
                return res.json(notesArr);
            });
        });
    });
    
    app.delete('/api/notes/:id', function (req, res) {
        let id = req.params.id;
        fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", function(err, data) {
            let notesArr = JSON.parse(data);
            for (let i = 0; i < notesArr.length; i++) {
                if (notesArr[i].id === id) {
                    notesArr.splice(i, 1);
                    fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notesArr), function(err, data) {
                        return notesArr;
                    });
                }
            } 
        });
        res.sendFile(path.join(__dirname, "../html/notes.html"));
    });
}