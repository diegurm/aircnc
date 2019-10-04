const express = require('express');
const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const SpotsController = require('./controllers/SpotController');

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotsController.index);
routes.post('/spots', upload.single('thumbnail'), SpotsController.store);

module.exports = routes;
