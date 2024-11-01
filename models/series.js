const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");


checkDatabaseConnection();

exports.queryToInsertSeriesName = async (title, description) => {
    const query = 'INSERT INTO series (title, description)= ?, ?';

    try{
        await pool.execute(query, [title, description]);
    } catch(error){
        console.log("Error: Inserting data to the series table", error);
    }
}


exports.queryVerifySeriesTitle = async (title) => {
    const query = 'SELECT * FROM series WHERE title = ?';
    try{
        response = await pool.execute(query, [title]);
        return response;
    } catch(error){
        console.log("Error retriving data");
        console.log("Error:", error);
    }
}


exports.queryInsertIntoSeriesUrl = async (url) => {
    const query = 'INSERT INTO series where url = ?';
    try{
        const insert = await pool.execute(query, [url]);
        return insert;
    } catch(error){
        console.log("Error inserting the url");
        console.log("Error", error);
    }
}

