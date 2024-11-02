const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");

checkDatabaseConnection();


exports.queryToCreateASeason = async (id_serie, user_id, season_name) => {
    const query = 'INSERT INTO seasons (serie_id, user_id, season_name) VALUES = ?, ?, ?';

    try{
        const [response] = await pool.execute(query, [id_serie, user_id, season_name]);
        console.log("Data inserted correctly");
        return response;
    } catch (error) {
        console.log("Data could not be inserted. Error:", error);
    }
}


//Para que el usuario pueda eliminar una season 
exports.queryDeleteSeason = async (season_id, serie_id, user_id) => {
    const query = 'DELETE FROM seasons WHERE id = ? AND serie_id = ? AND user_id = ?'

    try {
        const [response] = await pool.execute(query, [season_id, serie_id, user_id]);
        console.log("Season successfully deleted");
        return response;
    } catch(error) {
        console.log("Error deleting the season", error);
    }
}