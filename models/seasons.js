const pool = require("../config/config.js");


exports.queryVoteCountSeasons = async (season_id) => {
    const query = 'UPDATE seasons SET vote_count =  vote_count + 1 WHERE id = ?';
    try{
        await pool.execute(query, [season_id]);
        console.log("Vote count incremented successfully in seasons");
    } catch (error) {
        console.log("Error updating the vote count in seasons", error);
    }
}


exports.queryGetAllSeasons = async (serie_id) => {
    const query = `SELECT seasons.*, series.title
    FROM seasons
    INNER JOIN series ON series.id = seasons.serie_id
    WHERE series.id = ?`;

    try {
        const [response] = await pool.execute(query, [serie_id]);
        console.log("All seasons retrieved correctly");
        return response;
    } catch(error) {
        console.log("Error retrieving data from seasons table", error);
    }
}