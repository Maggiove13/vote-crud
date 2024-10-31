const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");

checkDatabaseConnection();


exports.queryToInsertUser = async(user_name, password, email) => {
    const query = 'INSERT INTO users (user_name, password, password) VALUES (?, ?, ?)';

    try {
        await pool.execute(query, [user_name, password, email]);
        console.log("User created");
    } catch (error) {
        console.log("Error:", error);
    }
}



