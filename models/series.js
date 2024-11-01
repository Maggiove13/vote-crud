const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");


checkDatabaseConnection();

exports.queryToInsertSeriesName = async (title, description, user_id) => {
    const query = 'INSERT INTO series (title, description, user_id) VALUES (?, ?, ?)';
    try {
        await pool.execute(query, [title, description, user_id]);
        console.log("Series inserted successfully.");
    } catch(error){
        console.log("Error: Inserting data to the series table", error);
    }
}


exports.queryVerifySeriesTitle = async (title) => {
    const query = 'SELECT title FROM series WHERE title = ?';
    try{
        const [rows] = await pool.execute(query, [title]);
        return rows; // Devuelve directamente las filas de los datos
    } catch(error){
        console.log("Error retriving data", error);
    }
}


exports.queryToGetAllTitles = async () => {
    const query = 'SELECT title FROM series';

    try{
        await pool.execute(query);
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