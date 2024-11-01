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
        const [response] = await pool.execute(query);
        return response;
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
exports.queryVoteCount = async (serie_id) => {
    const query = 'UPDATE series SET vote_count =  vote_count + 1 WHERE id = ?';
    try{
        await pool.execute(query, [serie_id]);
        console.log("Vote count incremented succesfully");
    } catch (error) {
        console.log("Error updating the vote count", error);
    }
}