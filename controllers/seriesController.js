const { queryToInsertSeriesName, queryVerifySeriesTitle, queryToGetAllTitles, queryDeleteSerie, queryUpdateSerie, queryInsertIntoSeriesUrl, queryDeleteLink, queryUpdateLink, queryVoteCount, queryGetIdFromTitle } = require("../models/series.js");

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

    const { title } = req.body
    
    try{
        if (!title || title.trim() === "") {
            return res.status(400).send({message: "Title not found"});
        }

        const titleLower = title.toLowerCase()

        const responseAllSeries = await queryToGetAllTitles();
        const serieExists = responseAllSeries.some(serie => {
            return serie.title === title;
        });

        if (!serieExists) {
            return res.status(404).send({ status: "Not Found", message: "That title doesn't exist"});
        }
        
        response = await queryDeleteSerie(titleLower);
        if (response.affectedRows === 0){
            return res.status(400).send({message: `title ${titleLower} not deleted`});
        } else {
            return res.status(200).send({message: `${title} deleted successfully from the databse`});
        }
    } catch(error){
        console.error("Error fetching all the series titles:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}



exports.updateSerieTitle = async (req, res) => {

    const { title, description, user_id } = req.body;

    try{

        if (!title || !user_id){
            return res.status(404).send({message: "TITLE, and USER_ID must be completed"});
        }

        const responseSerieId = await queryGetIdFromTitle(title);
        console.log("La respuesta del query para obtener ese es", responseSerieId)

        if (responseSerieId.length === 0) {
            console.log("Serie_id not found")
            return res.status(404).send({ message: "Serie not found"});
        }

        const serie_id = responseSerieId[0].id;
        console.log(serie_id);

        response = await queryUpdateSerie(title, description, serie_id, user_id);
        if (response.affectedRows === 0){

            console.log(title, description, serie_id, user_id);

            return res.status(400).send({message: "Data could not be updated"})
        } else {
            return res.status(200).send({status: "Success", message: "Data could not be updated", 
            dataUpdated: {
                id: serie_id,
                title: title,
                description: description
            }});
        }

    } catch(error){
        console.error("Error during the update:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.insertSerieLink = async (req, res) => {
    const { title, link } = req.body;

    if (!title){
        return res.status(400).send({message: "The title has to be specified"});
    }

    try{
        const responseSerieId = await queryGetIdFromTitle(title);
        console.log("La respuesta del query para obtener la serie_id es:", responseSerieId);

        if (responseSerieId.length === 0) {
            console.log("Serie_id not found")
            return res.status(404).send({ message: "Serie not found"});
        }

        const serie_id = responseSerieId[0].id;
        console.log(serie_id);

        if (!link){
            return res.status(400).send({message: "No link has been loaded"});
        }

        const responseQuery = await queryInsertIntoSeriesUrl(serie_id, link);
        if (responseQuery.affectedRows === 0){
            return res.status(400).send({message: "The link could not be inserted"});
        } else {
            return res.status(200).send({status: "Success", message: "The link was inserted correctly", SerieData: {
                Title: title,
                id: serie_id,
                link: link
            }});
        }

    } catch(error){
        console.error("Error insertando el link", error);
        return res.status(500).send({message: "Internal server error"});
    }

}



exports.deleteLink = async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === ""){
        return res.status(400).send({message: "Title is require to delete a link"});
    }

    try{
        
        const responseQuery = await queryDeleteLink(title);

        if (responseQuery.affectedRows === 0){
            return res.status(400).send({message: "The Link was not deleted"});
        } else {
            return res.status(200).send({message: "The Link successfully deleted"});
        }
    } catch(error){
        console.error("Error found:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.updateLink = async (req, res) => {
    const { title, link } = req.body;

    if (!title || title.trim() === ""){
        return res.status(400).send({message: "Title is required to delete a link"});
    }

    if (!link){
        return res.status(404).send({status: "NOT FOUND", message: "A link is require"});
    }

    try{

        const responseAllSeries = await queryToGetAllTitles();
        const serieExists = responseAllSeries.some(serie => {
            return serie.title === title;
        });

        if (!serieExists) {
            return res.status(404).send({ status: "NOT FOUND", message: "That title doesn't exist"});
        }

        const responseQueryUpdate = await queryUpdateLink(link, title);
        if (responseQueryUpdate. affectedRows === 0){
            return res.status(400).send({message: "No link was updated"});
        }
        

    } catch(error){
        console.error("Error:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}



exports.incrementVoteCount = async (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === "") {
        return res.status(400).send({message: "A title is required to vote for a serie"});
    }
    try{
        const responseSerieId = await queryGetIdFromTitle(title);
        console.log("Serie encontrada:", responseSerieId);
        if (!responseSerieId || responseSerieId.length === 0){
            return res.status(404).send({ message: "Serie not found"});
        }
        const serie_id = responseSerieId[0].id;

        responseVoteCount = await queryVoteCount(serie_id);
        if (responseVoteCount.affectedRows === 0){
            return res.status(404).send({ message: "Something is fishy"});
        } else{
            return res.status(200).send({ message: "your vote is counting"});
        }
    } catch(error){
        console.error("Error incrementando el contador de votos:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}