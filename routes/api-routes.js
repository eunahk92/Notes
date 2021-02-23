const path = require("path");
const fs = require("fs");
const notesDB = require("../db/db.json");

module.exports = app => {
    app.post("/api/notes", (req, res) => {
        let note = req.body;
        note.id = generateID();
        notesDB.push(note);
        fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notesDB), (err, data) => {
            if (err) throw err;
            return res.json(notesDB);
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        for (let i = 0; i < notesDB.length; i++) {
            if (notesDB[i].id === id) {
                notesDB.splice(i, 1);
                fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notesDB), (err, data) => {
                    if (err) throw err;
                    return notesDB;
                });
            }
        } 
        res.sendFile(path.join(__dirname, "../html/notes.html"));
    });

    generateID = () => {
        let id = '';
        const numbers = "0123456789"
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random() * numbers.length);
            id += numbers.charAt(index) + "";
        }
        return id;
    };
}