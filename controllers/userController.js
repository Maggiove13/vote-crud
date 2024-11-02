const { queryToInsertUser, queryToVerifyUser, queryGetUserId } = require("../models/users");


exports.registerUser = async (req, res) => {
    const { user_name, email, password } = req.body; 

        if (!user_name || !email || !password){
            return res.status(400).send({status: "Incomplete", message: "All the fields must be completed"});
        }

    try{

        await queryToInsertUser(user_name, password, email);
            return res.status(201).send({message: "User successfully created"})

    } catch(error){
        res.status(500).send({message: "Error creating user"});
        console.log("Error creating user", error);
    }
}



exports.getUserId = async (req, res, user_name) => {

    try{
        if (!user_name){
            console.log("user_name not found");
            return res.status(400).send({status: "Error", message: "user_name dont found"});
        }

        result = await queryGetUserId(user_name);
        if (result.lenght > 0){
            const user_id_res = result[0].id
            res.status(200).send({message: "Successfully retrieving the user_id", user_id: user_id_res});
            console.log(`The user_id from ${user_name} is: ${user_id_res}`);
        }
    } catch(error){
        console.log("Error obtaining the user id");
        res.status(500).send({status: "Error", message: "Internal server error"});
    }
}