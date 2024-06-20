const FormModel = require('../models/form.model');
const router = require('express').Router();
const formController = require ('../controllers/form.controller');




router.post('/create', formController.createForm);
router.get('/', formController.getAllForms);


module.exports = router;
