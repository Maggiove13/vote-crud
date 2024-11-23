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

