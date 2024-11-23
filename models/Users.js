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


exports.queryVerifyUser = async(email) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    try{
        const [ response ] = await pool.execute(query, [email]);
        return response;
    } catch(error){
        console.error("Error in queryVerifyUser:", error);
        throw error;
    }
}


exports.queryGetUserId = async(user_name) => {
    const query = 'SELECT id FROM users WHERE user_name = ?';

    try{
        const [response] = await pool.execute(query, [user_name]);
        return response;
    } catch (error) {
        console.error(`Error retreiving the id from the user ${user_name}: ${error}`);
        throw error;
    }
}


