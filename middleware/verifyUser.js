
const queryGetIdsFromTitle = require('../models/series.js');

const verifyCreator = async (req, res, next) => {
    const { title , user_id } = req.body;

    try {
        if (!title ||title.trim() === "" || !user_id){
            return res.status(400).send({message: "Title and user_id are required to continue"});
        }

        const titleLower = title.trim().toLowerCase();

        const creatorIdResponse = await queryGetIdsFromTitle(titleLower);

        if (creatorIdResponse.length === 0) {
            return res.status(404).send({ message: "Serie not found" });
        }

        const creatorId = creatorIdResponse[0].user_id;

        
        if (creatorId !== user_id) {
            return res.status(403).send({ message: "You are not authorized to perform this action" });
        }

        next();
    } catch (error) {
        console.error("Error verifying creator:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = verifyCreator;
