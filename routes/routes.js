const express = require('express');

const { registerUser, getUserId} = require("../controllers/userController.js");
const { insertSerie, getAllSeries, deleteSerie, updateSerieTitle, insertSerieLink, deleteLink, 
    updateLink, incrementVoteCount } = require("../controllers/seriesController.js");

//const verifyCreator = require("../middleware/verifyUser.js");

const router = express.Router();

router.post('/register',registerUser);

router.post('/series', insertSerie);

router.get('/series', getAllSeries);

router.put('/series', updateSerieTitle);

router.delete('/series', deleteSerie);

router.post('/series/link', insertSerieLink);

router.delete('/series/link', deleteLink);

router.put('/series/link', updateLink);


module.exports = router;