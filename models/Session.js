const pool = require("../config/config.js");

exports.queryCreateSession = async (user_id) => {
    const query = 'INSERT INTO sessions (user_id) VALUE (?)';
    try {
        const [ response ] = await pool.execute(query, [user_id]);
        return response;
    } catch (error) {
        console.error("Error in queryCreateSession:", error);
        throw error;
    }
}


exports.queryDeleteSession = async (session_id) => {
    const query = 'DELETE FROM sessions WHERE id = ?';
    try {
        const [ response ] = await pool.execute(query, [session_id]);
        return response;
    } catch (error) {
        console.error("Error in queryCreateSession:", error);
        throw error;
    }
}


exports.queryGetSession = async (session_id) => {
    const query = 'SELECT * FROM sessions WHERE id = ?';
    try {
        const [ response ] = await pool.execute(query, [session_id]);
        return response;
    } catch (error) {
        console.error("Error in queryCreateSession:", error);
        throw error;
    }
}