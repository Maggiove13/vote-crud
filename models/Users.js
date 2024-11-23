const pool = require("../config/config.js");


exports.queryInsertUser = async(user_name, email, password, role) => {
    const query = 'INSERT INTO users (user_name, email, password, role) VALUES (?, ?, ?, ?)';

    try {
        const [ response ] = await pool.execute(query, [user_name, email, password, role]);
        return response;
    } catch (error) {
        console.error("Error in queryInsetUser:", error);
        throw error;
    }
}







