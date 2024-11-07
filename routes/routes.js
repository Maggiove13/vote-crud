const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');


// Ruta para insertar una nueva serie
router.post('/series', seriesController.insertSerie);

// Ruta para incrementar el contador de votos de una serie
router.post('/series/vote', seriesController.incrementVoteCount);

// Ruta para eliminar una serie
router.post('/series/delete', seriesController.deleteSerie);

// Ruta para actualizar una serie específica
router.post('/series/update/:serie_id', seriesController.updateSerie);


//----------------->   Rutas para vistas

// Ruta para mostrar la página de edición de una serie específica
router.get('/series/edit/:serie_id', seriesController.renderEditSeriesPage);

// Ruta para listar todas las series
router.get('/series', seriesController.renderSeriesPage);

// Ruta para Visualizar la pagina para agregar series
router.get('/series/add', seriesController.renderAddSeriePage);

module.exports = router;
