const pool = require("../config/config.js");


// Función asíncrona para verificar la conexión a la base de datos
async function checkDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        if (!connection) {
            console.log("There is no connection to the database");
            return;
        }
        console.log("Connection to the MySQL database established successfully");
        connection.release(); // Libera la conexión después de verificar
    } catch (error) {
        console.error("Error connecting to the MySQL database:", error);
    }
}


module.exports = { checkDatabaseConnection };