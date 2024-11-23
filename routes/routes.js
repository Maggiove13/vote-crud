const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');
const seasonsController = require('../controllers/seasonsController');
const userController = require('../controllers/usersController.js');
const Auth = require('../middleware/authorization.js');


router.post('/register', userController.registerUser );
router.post('/login', Auth.limiter, userController.login);
router.post('/logout', userController.logout);


router.post('/series/create',  Auth.requireAdmin, seriesController.insertSerie);
router.post('/series/vote',  seriesController.incrementVoteCount);
router.post('/series/delete',  Auth.requireAdmin, seriesController.deleteSerie);
router.post('/series/update/:serie_id',  Auth.requireAdmin, seriesController.updateSerie);
router.post('/series/seasons/all/:serie_id/vote',  seasonsController.incrementVoteCount);

//----------------->   Routes for render
router.get('/series/edit/:serie_id',  Auth.requireAdmin, seriesController.renderEditSeriesPage);
router.get('/series/ordered', seriesController.orderedSeries);
router.get('/series/insert',  Auth.requireAdmin, seriesController.renderAddSeriePage);
router.get('/series/seasons/:serie_id', seasonsController.renderAllSeasons);

// Public routes
router.get('/series', seriesController.renderSeriesPage);
router.get('/login', userController.renderLoginPage);


module.exports = router;