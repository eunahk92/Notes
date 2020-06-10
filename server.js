const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static('./assets/'));

require("./assets/js/html-routes.js")(app);
require("./assets/js/api-routes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});