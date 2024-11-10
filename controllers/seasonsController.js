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

