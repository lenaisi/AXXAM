const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/add', adminController.addHouse);
router.get('/', adminController.getHouses);

module.exports = router;
