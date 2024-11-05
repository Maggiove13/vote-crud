const pool = require("../config/config.js");


exports.queryToInsertUser = async(user_name, password, email) => {
    const query = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';

    try {
        await pool.execute(query, [user_name, email, password]);
        console.log("User created");
    } catch (error) {
        console.log("Error:", error);
    }
}


exports.queryToVerifyUser = async(email) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    try{
        const [ response ] = await pool.execute(query, [email]);
        return response;
    } catch(error){
        console.log("Error:", error);
    }
}


exports.queryGetUserId = async(user_name) => {
    const query = 'SELECT id FROM users WHERE user_name = ?';

    try{
        const [response] = await pool.execute(query, [user_name]);
        return response;
    } catch (error) {
        console.log(`Error retreiving the id from the user ${user_name}: ${error}`);
        throw error;
    }
}
