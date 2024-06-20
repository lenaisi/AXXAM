
const router = require('express').Router();
const formvisitController = require ('../controllers/formvisit.controller');





router.post('/create', formvisitController.createForm);



module.exports = router;