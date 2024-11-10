const seasonsModels = require("../models/seasons.js");

exports.incrementVoteCount = async (req, res) => {
    const { season_id } = req.body;
    const back = req.header("Referer");

    if (!season_id) {
        return res.status(400).send({message: "A season_id required to vote for a season"});
    }
    
    try{
        await seasonsModels.queryVoteCountSeasons(season_id);
        res.redirect(back);
    
    } catch(error){
        console.error("Error incrementando el contador de votos:", error);
        return res.status(500).send({message: "Internal server error"});
    }
}


exports.renderAllSeasons = async (req, res) => {
    const { serie_id } = req.params;
    
    try {
        const seasons = await seasonsModels.queryGetAllSeasons(serie_id);
        console.log("Datos de objeto seasons:", seasons);
        
        if (!seasons || seasons.length === 0) {
            return res.status(404).send("seasons from that id not found");
        }

        const title = seasons[0].title
        res.render('allSeasons', { seasons, title });

    } catch (error) {
        console.error("Error loading the insert season page:", error);
        return res.status(500).send("Error inserting the season", serie_id);
    }
};