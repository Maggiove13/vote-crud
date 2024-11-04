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

        const { serie_id, affectedRows } = await queryToInsertSeriesName(title, description || null, user_id);
        console.log(affectedRows);
        if (affectedRows === 0) {
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



exports.getAllSeries = async (res, req) => {
    try{
        const responseAllSeries = await queryToGetAllTitles();

        if (responseAllSeries.length > 0){
            console.log("Series retrieved:", responseAllSeries);
            return res.status(200).send({
                message: "Successfully retrieved all the series", 
                data: responseAllSeries
            })
        } else {
            return res.status(404).send({message: "No series found"});
        }
    } catch(error){
        console.log("Error fetching all the series data:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.deleteSerie = async (req, res) => {

    const { title, user_id } = req.body
    
    try{
        if (!title && user_id){
            res.status(404).send({message: "user_id and title not found"});
        }

        const responseAllSeries = await queryToGetAllTitles();
        const serieExists = responseAllSeries.some(serie => {
            return serie.title === title;
        });

        if (!serieExists) {
            return res.status(404).send({ status: "NOT FOUND", message: "That title doesn't exist"});
        }
        
        response = await queryDeleteSerie(title, user_id);
        if (response.affectedRows === 0){
            return res.status(400).send({message: `title ${title} not deleted`});
        } else {
            return res.status(200).send({message: `${title} deleted successfully`});
        }
    } catch(error){
        console.log("Error fetching all the series titles:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}