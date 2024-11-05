const express = require('express');

const { registerUser, getUserId} = require("../controllers/userController.js");
const { insertSerie, getAllSeries, deleteSerie, updateSerieTitle, insertSerieLink, deleteLink, 
    updateLink, incrementVoteCount } = require("../controllers/seriesController.js");


const router = express.Router();

router.post('/register',registerUser);

router.post('/series', insertSerie);

router.get('/series', getAllSeries);




module.exports = router;