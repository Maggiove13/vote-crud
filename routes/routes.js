const express = require('express');

const { registerUser, getUserId} = require("../controllers/userController.js");
const { insertSerie, getAllSeries, deleteSerie, updateSerie, insertSerieLink, deleteLink, 
updateLink, incrementVoteCount, renderSeriesPage} = require("../controllers/seriesController.js");

const { insertSeason } = require("../controllers/seasonsController.js");



//const verifyCreator = require("../middleware/verifyUser.js");

const router = express.Router();

router.post('/register',registerUser);

router.post('/series', insertSerie);

router.get('/series', getAllSeries);

router.put('/series', updateSerie);

router.delete('/series', deleteSerie);

router.post('/series/link', insertSerieLink);

router.delete('/series/link', deleteLink);

router.put('/series/link', updateLink);

router.post('/series/vote', incrementVoteCount);

router.post('/series/seasons', insertSeason);

router.get('/', renderSeriesPage);

router.get('/series/add', (req, res) => {
    res.render('addSeries'); // Renders the form to add a new series
});

module.exports = router;