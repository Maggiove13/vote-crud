const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");

checkDatabaseConnection();
