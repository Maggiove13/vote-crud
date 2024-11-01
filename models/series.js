const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");


checkDatabaseConnection();

exports.queryToInsertSeriesName = async (title, description) => {
    const query = 'INSERT INTO series (title, description) VALUES (?, ?)';
    try {
        await pool.execute(query, [title, description]);
        console.log("Series inserted successfully.");
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


exports.queryToGetAllTitles = async () => {
    const query = 'SELECT * FROM series WHERE titles = ?';

    try{
        await pool.execute(query, [titles]);
    } catch(error){
        console.log("Error getting the data from the database", error);
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

// Para agregar los votos del usuario a la tabla
exports.queryVoteCount = async (vote_count) => {
    const query = 'INSERT INTO series WHERE vote_count = ?';
    try{
        await pool.execute(query, [vote_count]++);
    } catch (error) {
        console.log("Error inserting the vote into the table", error);
    }
}