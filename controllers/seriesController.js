const { queryToInsertSeriesName, queryVerifySeriesTitle, queryToGetAllTitles, queryDeleteSerie, queryUpdateSerie, queryInsertIntoSeriesUrl, queryDeleteLink, queryUpdateLink, queryVoteCount } = require("../models/series.js");

const { getUserId } = require("./userController.js");


exports.insertSerie = async (req, res) => {
    const { title, description, user_id } = req.body;

    try{  
        
        if (!title || !user_id){
            console.log("title not found");
            return res.status(400).send({status: "Error", message: "Title and user_id are required"});
        }
        
        const verifyTitleResponse = await queryVerifySeriesTitle(title);
        if (verifyTitleResponse.length > 0){
            return res.status(400).send({message: "this title already exists"});
        }

        const insertResponse = await queryToInsertSeriesName(title, description || null, user_id);
        console.log(insertResponse);
        if (insertResponse.affectedRows === 0) {
            return res.status(201).send({
                status: "Error inserting data",
                message: "Data not inserted in the table"
            });
        }

        return res.status(201).send({
            status: "Success",
            message: "Serie successfully inserted", 
            data: {title, description, user_id}
        });

    } catch (error){
        console.log("Error inserting a serie:", error);
        res.status(500).send({message: "Internal server error"});
    }
}