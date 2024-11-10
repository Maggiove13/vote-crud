const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes.js");
const { checkDatabaseConnection } = require("./models/models.js"); 

dotenv.config()

const app = express();

checkDatabaseConnection();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

//app.use(express.static("public"));

app.set("view engine", "ejs");

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});