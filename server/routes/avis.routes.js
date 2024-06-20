// avis.routes.js

const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avis.controller');


router.post('/avis', avisController.createAvis);
router.get('/avis', avisController.getAllAvis);
router.get('/avis/:id', avisController.getAvisById);
router.put('/avis/:id', avisController.updateAvis);
router.delete('/avis/:id', avisController.deleteAvis);

module.exports = router;
