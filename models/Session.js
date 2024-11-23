const pool = require("../config/config.js");

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);


const options = {
    schema: {
        tableName: "sessions", 
        columnNames: {
            session_id: "session_id", 
            expires: "expires", 
            data: "session_data" 
        },
    },
};

const sessionStore = new MySQLStore(options, pool);

sessionStore.on('session', function(session) {
    console.log("Session to be stored: ", session);
});

module.exports = sessionStore;
