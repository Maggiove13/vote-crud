const pool = require("../config/config.js");

exports.queryToInsertSeriesName = async (title, description, image, link_url) => {
    const query = 'INSERT INTO series (title, description, image, link_url) VALUES (?, ?, ?, ?)';
    try {
        const [ result ] = await pool.execute(query, [title, description, image, link_url]);
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
    const query = 'SELECT * FROM series ORDER BY vote_count DESC';

    try{
        const [response] = await pool.execute(query);
        return response;
    } catch(error){
        console.log("Error getting the data from the database", error);
    }
}


exports.queryGetIdsFromTitle = async (title) => {
    const query = 'SELECT id, user_id FROM series WHERE title = ?';

    try{
        const [ response ] = await pool.execute(query, [title]);

        if (response.length === 0) {
            console.log(`No series found with the title: ${title}`);
            return null; 
        }
        console.log(`${title} have id: ${response}`);
        return response;
    } catch(error){
        console.error("Error getting the serie_id from the database", error);
        throw error;
    }
}


exports.querySerieById = async (serie_id) => {
    const query = 'SELECT * FROM series WHERE id = ?';
    try {
        const [result] = await pool.execute(query, [serie_id]);
        return result;
    } catch (error) {
        console.error("Error getting the data from the id:", error);
        throw error;
    }
};



// Para que un usuario pueda eliminar un id de una tabla
exports.queryDeleteSerie = async (serie_id) => {
    const query = 'DELETE FROM series WHERE id = ?';

    try{
        const [response] = await pool.execute(query, [serie_id]);
        console.log("Serie deleted successfully");
        return response;
    } catch (error){
        console.log("Error deleting the series", error);
    }
}

exports.queryUpdateSerie = async (title, description, image, link, serie_id) => {
    const query = 'UPDATE series SET title = ?, description = ?, image = ?, link_url = ? WHERE id = ?';

    try{
        const [response] = await pool.execute(query, [title, description, image, link, serie_id]);
        console.log("Serie updated successfully");
        return response;
    } catch (error){
        console.error("Error updating the serie", error);
        throw error;
    }
}


// Para agregar los votos del usuario a la tabla
exports.queryVoteCount = async (title) => {
    const updateQuery = 'UPDATE series SET vote_count = vote_count + 1 WHERE title = ?';
    const selectQuery = 'SELECT vote_count FROM series WHERE title = ?';

    try {
        // Ejecuta la actualización
        await pool.execute(updateQuery, [title]);
        console.log("Vote count incremented successfully");

        const [response] = await pool.execute(selectQuery, [title]);
        return response; 
    } catch (error) {
        console.log("Error updating the vote count", error);
        throw error; 
    };
}
