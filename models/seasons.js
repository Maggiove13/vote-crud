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