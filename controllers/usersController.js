const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');


dotenv.config();

exports.registerUser = async (req, res) => {
    const { user_name, email, password } = req.body; 

        if (!user_name || !email || !password){
            return res.status(400).send({status: "Incomplete", message: "All the fields must be completed"});
        }

    try{
        const existingUser = await Users.queryVerifyUser(email);
        if (existingUser.length > 0){
            return res.status(400).send({status: "Bad requests", message: "This email is already registered"});
        }

        const hash = await bcrypt.hash(password, 10);
        const admin = process.env.ADMIN_ROLE;
        const adminEmail = process.env.ADMIN_EMAIL;

        let role;
        if(email === adminEmail){
            role = 'admin';
        } else {
            role = 'users';
        }

        const responseQuery = await Users.queryInsertUser(user_name, email, hash, role);

        if (!responseQuery){
            return res.status(404).json({message: "Something went wrong while creating the user" });
        }
        const user_id = responseQuery.insertId;
        //console.log(responseQuery);

        res.redirect('/api/login');

    } catch(error){
        res.status(500).send({message: "Error while register the user"});
        console.error("Error in registration:", error);
    }
}


exports.login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const existingUser  = await Users.queryVerifyUser (email);
        if (existingUser .length === 0) {
            return res.redirect('/api/login?error=userNotFound');
        }

        const user = existingUser [0];

        // Verificar la contraseña
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.redirect('/api/login?error=invalidPassword');
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_EXPIRES = process.env.JWT_EXPIRES;
        const tokenPayload = { id: user.id, role: user.role, email: user.email };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        if (rememberMe === 'true') {
            req.session.user = {
                id: user.id,
                role: user.role,
                email: user.email,
            };

            req.session.save((err) => {
                if (err) {
                    console.error("Error al guardar la sesión:", err);
                    return res.status(500).json({ message: "Error while saving session" });
                }

                // res.cookie("sessionId", req.session.user, {
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: "strict",
                //     maxAge: 1000 * 60 * 60 * 24, // 1 día
                // });
                
                res.redirect('/api/series');
            });
        } else {
            // Autenticación sin estado con JWT
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            
            res.redirect('/api/series');
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: "Error while logging out" });
        }

        //res.clearCookie("sessionId");
        res.clearCookie("session_id");
        res.clearCookie("authToken");
        console.log("Logout exitoso");
        res.redirect('/api/login'); 
    });
};

exports.renderLoginPage = async (req, res) => {
    res.render('login');
}

exports.renderRegisterPage = async (req, res) => {
    res.render('register');
}