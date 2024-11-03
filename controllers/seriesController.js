const { queryToInsertSeriesName, queryVerifySeriesTitle, queryToGetAllTitles, queryDeleteSerie, queryUpdateSerie, queryInsertIntoSeriesUrl, queryDeleteLink, queryUpdateLink, queryVoteCount } = require("../models/series.js");

const { getUserId } = require("./userController.js");

exports.InsertSerie = async () => {


    try{

    } catch (error){
        console.log("Error inserting a serie", error);
    }

}