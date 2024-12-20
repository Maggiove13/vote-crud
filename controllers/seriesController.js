const { 
    queryToInsertSeriesName, 
    queryVerifySeriesTitle, 
    queryGetSeriesOrderByVotes, 
    queryDeleteSerie, 
    queryUpdateSerie, 
    queryVoteCount, 
    querySerieById} = require("../models/series.js");


exports.insertSerie = async (req, res) => {
    const { title, description, image, link_url } = req.body;
    
    try{  
        
        if (!title || title.trim() === ""){
            console.log("Title not found");
            return res.status(400).json({status: "Error", message: "A title is required"});
        }

        const titleUpper = title.trim().toUpperCase();
        const newDescription = description?.trim() || null;
        const newImage = image?.trim() || null;
        const newLink = link_url?.trim() || null;

        const verifyTitleResponse = await queryVerifySeriesTitle(titleUpper);
        if (verifyTitleResponse.length > 0){
            return res.status(400).json({message: "Title already exists"});
        }
        
        const { serie_id, affectedRows } = await queryToInsertSeriesName(titleUpper, newDescription, newImage, newLink);
        console.log(affectedRows);
        if (affectedRows === 0) {
            return res.status(400).json({
                status: "Error inserting data",
                message: "Data not inserted in the table"
            });
        }
        res.redirect('/api/series');

    } catch (error){
        console.log("Error inserting a serie:", error);
        res.status(500).json({message: "Internal server error"});
    }
}


exports.getAllSeries = async (req, res) => {
    try{
        const responseAllSeries = await queryGetSeriesOrderByVotes();

        if (responseAllSeries.length > 0){
            console.log("Series retrieved:", responseAllSeries);
            return res.status(201).json({
                message: "Successfully retrieved all the series", 
                data: responseAllSeries
            })
        } else {
            return res.status(404).json({message: "No series found"});
        }
    } catch(error){
        console.log("Error fetching all the series data:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.deleteSerie = async (req, res) => {

    const { serie_id} = req.body
    
    try{
        if (!serie_id) {
            return res.status(400).json({message: "Serie_id not found"});
        }

        response = await queryDeleteSerie(serie_id);
        if (response.affectedRows === 0){
            return res.status(400).json({message: `serie not deleted`});
        } else {
            res.redirect('/api/series');
        }
    } catch(error){
        console.error("Error fetching all the series titles:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.updateSerie = async (req, res) => {
    const { title, description, image, link_url} = req.body;
    const { serie_id } = req.params;
    

    console.log("Datos recibidos:", req.body); 
    console.log("Serie ID:", serie_id); 

    try{
        if (!title || title.trim() === ""){
            return res.status(400).json({message: "Title not found"});
        }

        if (!serie_id){
            return res.status(400).json({message: "serie_id not found"});
        }

        const titleUpper = title.trim().toUpperCase();
        const newDescription = description?.trim() || null;
        const newImage = image?.trim() || null;
        const newLink = link_url?.trim() || null;

        const response = await queryUpdateSerie(titleUpper, newDescription, newImage, newLink, serie_id);
        if (response.affectedRows === 0){
            return res.status(400).json({message: "Serie could not be updated"});
        } else {
            res.redirect('/api/series');
        }
    } catch(error){
        console.error("Error during the update:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.incrementVoteCount = async (req, res) => {
    const { title } = req.body;
    //const back = req.header("Referer");

    if (!title || title.trim() === "") {
        return res.status(400).json({message: "A title is required to vote for a serie"});
    }

    const titleUpper = title.trim().toUpperCase();
    try{
        const updatedSerie = await queryVoteCount(titleUpper);
        console.log(updatedSerie);
        return res.json({
            vote_count: updatedSerie[0].vote_count,
            csrfToken: req.csrfToken()
        });;
        
    } catch(error){
        console.error("Error incrementando el contador de votos:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


exports.renderSeriesPage = async (req, res) => {
    try {
        const allSeries = await queryGetSeriesOrderByVotes();

        res.render("index", {allSeries});
    } catch (error) {
        console.error("Error while rendering the page:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.renderEditSeriesPage = async (req, res) => {
    const { serie_id } = req.params;

    console.log("Serie id for update:", serie_id);
    try {
        const serie = await querySerieById(serie_id);
        //console.log("Datos de objeto serie:", serie);
        
        if (!serie) {
            return res.status(404).json("Serie no encontrada");
        }
        
        res.render('editSerie', { serie, csrfToken: req.csrfToken() });
    } catch (error) {
        console.error("Error loading the edition page:", error);
        return res.status(500).json("Error updating the serie", serie_id);
    }
};


exports.renderAddSeriePage = (req, res) => {
    res.render('addSeries', { csrfToken: req.csrfToken() }); 
};


exports.orderedSeries = async (req, res) => {
    try {
        const seriesList = await queryGetSeriesOrderByVotes(); 
        //console.log("Datos de objeto serie:", seriesList);
        
        if (!seriesList || seriesList.length === 0) {
            return res.status(404).json({ message: "No se encontraron series" });
        } else {
            return res.json(seriesList); 
        }
    } catch (error) {
        console.error("Error ordenando las series controller:", error);
        return res.status(500).json({ message: "Error al ordenar las series en controller", error: error.message });
    }
};