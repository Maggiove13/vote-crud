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