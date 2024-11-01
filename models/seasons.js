const { checkDatabaseConnection } = require("./models.js"); 
const pool = require("../config/config.js");

checkDatabaseConnection();


exports.queryToCreateASeasonTheme = async (id_serie, user_id, season_name) => {
    const query = 'INSERT INTO seasons (serie_id, user_id, season_name) VALUES = ?, ?, ?';

    try{
        const [response] = await pool.execute(query, [id_serie, user_id, season_name]);
        console.log("Data inserted correctly");
        return response;
    } catch (error) {
        console.log("Data could not be inserted. Error:", error);
    }
}
