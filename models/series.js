const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");


checkDatabaseConnection();

exports.queryToInsertSeriesName = async (title, description, user_id) => {
    const query = 'INSERT INTO series (title, description, user_id) VALUES (?, ?, ?)';
    try {
        const [ result ] = await pool.execute(query, [title, description, user_id]);
        console.log("Series inserted successfully.");

        const serie_id = result.insertId; 
        return { serie_id, affectedRows: result.affectedRows };
    } catch(error){
        console.log("Error: Inserting data to the series table", error);
    }
}


exports.queryVerifySeriesTitle = async (title) => {
    const query = 'SELECT title FROM series WHERE title = ?';
    try{
        const [response] = await pool.execute(query, [title]);
        return response; 
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


exports.queryGetIdFromTitle = async (title) => {
    const query = 'SELECT id FROM series WHERE title = ?';

    try{
        const [ response ] = await pool.execute(query, [title]);
        console.log("The title searched is:", title);
        console.log(`${title} have id: ${response}`);
        return response;
    } catch(error){
        console.log("Error getting the serie_id from the database", error);
    }
}


// Para que un usuario pueda eliminar un id de una tabla
exports.queryDeleteSerie = async (title, user_id) => {
    const query = 'DELETE FROM series WHERE title = ?, AND user_id = ?';

    try{
        const [response] = await pool.execute(query, [title, user_id]);
        console.log("Serie deleted successfully");
        return response;
    } catch (error){
        console.log("Error deleting the series", error);
    }
}


// Para que un usuario pueda actualizar el nombre de una serie
exports.queryUpdateSerie = async (title, description, serie_id, user_id) => {
    const query = 'UPDATE series SET title = ?, description = ? WHERE id = ? AND user_id = ?';

    try{
        const [response] = await pool.execute(query, [title, description, serie_id, user_id]);
        console.log("Serie title, and description updated successfully");
        return response;
    } catch (error){
        console.log("Error deleting the series", error);
    }
}


exports.queryInsertIntoSeriesUrl = async (serie_id, url) => {
    const query = 'INSERT INTO series url = ?, WHERE id = ?';
    try{
        const [result] = await pool.execute(query, [serie_id, url]);
        console.log("url inserted correctly");
        return result;
    } catch(error){
        console.log("Error inserting the url", error);
    }
}


// Para eliminar el link
exports.queryDeleteLink = async (link, serie_id) => {
    const query = 'UPDATE series SET link_url = NULL WHERE id = ?';
    try{
        const [result] = await pool.execute(query, [link, serie_id]);
        console.log("Link deleted successfully.");
        return result;
    } catch(error){
        console.log("Error deleting the link", error);
    }
}


// Para ponerle otro link
exports.queryUpdateLink = async (link, serie_id) => {
    const query = 'UPDATE series SET link_url = ? WHERE id = ?';
    try{
        const [result] = await pool.execute(query, [link, serie_id]);
        console.log("Link updated successfully.");
        return result;
    } catch(error){
        console.log("Error updating the link", error);
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
