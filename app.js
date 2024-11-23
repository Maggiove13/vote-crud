const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes.js");
const { checkDatabaseConnection } = require("./models/models.js"); 
const cookieParser = require('cookie-parser');
const Auth = require('./middleware/authorization.js');
const session = require("express-session");
const sessionStore = require("./models/Session.js");
const csurf = require('csurf');
const xss = require('xss-clean');

dotenv.config()

const app = express();
const csurfProtection = csurf({cookie: true});

checkDatabaseConnection();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
//app.use(express.static("public"));
app.use(csurfProtection);

app.use((req, res, next) => {
    if (req.csrfToken) {
        res.locals.csrfToken = req.csrfToken(); 
    }
    next();
});

app.set("view engine", "ejs");

app.use(
    session({
        key: "session_id",
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 día
            httpOnly: true,
            sameSite: "strict",
        },
    })
);

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});