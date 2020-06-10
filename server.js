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

// Routes for html & api pages
require("./assets/js/html-routes.js")(app);
require("./assets/js/api-routes.js")(app);

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});