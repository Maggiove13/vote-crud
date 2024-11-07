const { 
    queryToInsertSeriesName, 
    queryVerifySeriesTitle, 
    queryToGetAllTitles, 
    queryDeleteSerie, 
    queryUpdateSerie, 
    queryInsertIntoSeriesLink, 
    queryDeleteLink, 
    queryUpdateLink, 
    queryVoteCount, 
    queryGetIdsFromTitle,
    queryGetSerieById} = require("../models/series.js");

const { getUserId } = require("./userController.js");


exports.insertSerie = async (req, res) => {
    const { title, description, user_id, image, link_url } = req.body;

    try{  
        
        if (!title || title.trim() === ""){
            console.log("Title not found");
            return res.status(400).send({status: "Error", message: "A title is required"});
        }

        const titleLower = title.trim().toLowerCase();
        const newDescription = description?.trim() || null;
        const newImage = image?.trim() || null;
        const newLink = link_url?.trim() || null;

        const verifyTitleResponse = await queryVerifySeriesTitle(titleLower);
        if (verifyTitleResponse.length > 0){
            return res.status(400).send({message: "Title already exists"});
        }
        
        const { serie_id, affectedRows } = await queryToInsertSeriesName(titleLower, newDescription, user_id, newImage, newLink);
        console.log(affectedRows);
        if (affectedRows === 0) {
            return res.status(400).send({
                status: "Error inserting data",
                message: "Data not inserted in the table"
            });
        }

        return res.status(201).send({
            status: "Success",
            message: "Serie successfully inserted", 
            data: {Title: titleLower,
                Description: description, 
                id_Serie: serie_id,
                User_id: user_id}
        });

    } catch (error){
        console.log("Error inserting a serie:", error);
        res.status(500).send({message: "Internal server error"});
    }
}



exports.getAllSeries = async (req, res) => {
    try{
        const responseAllSeries = await queryToGetAllTitles();

        if (responseAllSeries.length > 0){
            console.log("Series retrieved:", responseAllSeries);
            return res.status(201).send({
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

        const titleLower = title.trim().toLowerCase();

        const responseAllSeries = await queryToGetAllTitles();
        const serieExists = responseAllSeries.some(serie => {
            return serie.title === titleLower;
        });

        if (!serieExists) {
            return res.status(404).send({ status: "Not Found", message: "That title doesn't exist"});
        }
        
        response = await queryDeleteSerie(titleLower);
        if (response.affectedRows === 0){
            return res.status(400).send({message: `title ${titleLower} not deleted`});
        } else {
            return res.status(200).send({message: `${titleLower} deleted successfully from the databse`});
        }
    } catch(error){
        console.error("Error fetching all the series titles:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}



exports.updateSerie = async (req, res) => {

    const { title, description, image, link, serie_id } = req.body;

    try{

        if (!title || !title.trim() === ""){
            return res.status(400).send({message: "Title not found"});
        }

        const titleLower = title.trim()
        const newDescription = description?.trim() || null;
        const newImage = image?.trim() || null;
        const newLink = link?.trim() || null;


        response = await queryUpdateSerie(titleLower, newDescription, newImage , newLink, serie_id);
        if (response.affectedRows === 0){
            return res.status(400).send({message: "Serie could not be updated"})
        } else {
            return res.status(200).send({status: "Success", message: "Serie successfully updated", 
            dataUpdated: {
                id: serie_id,
                Title: titleLower,
                Description: newDescription,
                Image: newImage,
                Link: newLink
            }});
        }

    } catch(error){
        console.error("Error during the update:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.insertSerieLink = async (req, res) => {
    const { title, link } = req.body;

    if (!title || title.trim() === ""){
        return res.status(400).send({message: "Title not found"});
    }
    const titleLower = title.trim().toLowerCase();
    const Linkk = link.trim();
    try{
        const responseSerieId = await queryGetIdsFromTitle(titleLower);
        console.log("La respuesta del query para obtener la serie_id es:", responseSerieId);

        if (responseSerieId.length === 0) {
            console.log("Serie_id not found")
            return res.status(404).send({ message: "Serie not found"});
        }

        const serie_id = responseSerieId[0].id;
        console.log(serie_id);

        if (!Linkk){
            return res.status(400).send({message: "No link provided"});
        }


        const responseQuery = await queryInsertIntoSeriesLink(Linkk, titleLower);
        if (responseQuery.affectedRows === 0){
            return res.status(400).send({message: "The link could not be inserted"});
        } else {
            return res.status(200).send({status: "Success", message: "The link was inserted correctly", SerieData: {
                Title: titleLower,
                id: serie_id,
                Link: Linkk
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

    const titleLower = title.trim().toLowerCase();
    try{
        
        const responseQuery = await queryDeleteLink(titleLower);

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
    const titleLower = title.trim().toLowerCase();

    if (!link){
        return res.status(404).send({status: "NOT FOUND", message: "A link is require"});
    }
    const linkk = link.trim();
    try{

        const responseAllSeries = await queryToGetAllTitles();
        const serieExists = responseAllSeries.some(serie => {
            return serie.title === titleLower;
        });

        if (!serieExists) {
            return res.status(404).send({ status: "NOT FOUND", message: "That title doesn't exist"});
        }

        const responseQueryUpdate = await queryUpdateLink(linkk, titleLower);
        if (responseQueryUpdate. affectedRows === 0){
            return res.status(400).send({message: "No link was updated"});
        }
        
        return res.status(200).send({
            status: "Success",
            message: "Link updated successfully",
            data: {
                title: titleLower,
                New_link: linkk
            }
        });

    } catch(error){
        console.error("Error:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}



exports.incrementVoteCount = async (req, res) => {
    const { title } = req.body;
    const back = req.header("Referer");

    if (!title || title.trim() === "") {
        return res.status(400).send({message: "A title is required to vote for a serie"});
    }
    const titleLower = title.trim().toLowerCase();
    try{
        await queryVoteCount(titleLower);
        res.redirect(back);
    } catch(error){
        console.error("Error incrementando el contador de votos:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.renderSeriesPage = async (req, res) => {
    try {
        const allSeries = await queryToGetAllTitles();
        console.log("All the series:", allSeries);
        res.render("index", {allSeries});
    } catch (error) {
        console.error("Error while rendering the page:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}