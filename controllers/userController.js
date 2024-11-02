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


exports.VerifyUser = async (req, res) => {
    const { email } = req.body 

    try{
        result = await queryToVerifyUser(email);
        if (result.lenght > 0){
            res.status(400).send({status: "Error", message: "This user already exists"});
        }
    }catch(error){
        res.status(500).send({message: "Internal server error"});
        console.log("Error verifying the email", error);
    }
}