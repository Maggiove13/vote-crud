const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");


checkDatabaseConnection();

exports.queryToInsertSeriesName = async (title, description) => {
    const query = 'INSERT INTO series (title, description)= ?, ?';

    try{
        await pool.execute(query, [title, description]);
    } catch(error){
        console.log("Error:", error);
    }
}