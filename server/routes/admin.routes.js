const express = require('express');
const router = express.Router();
const { requireAuth, authorizeRoles } = require('../middlewares/auth.middleware');
const adminController = require('../controllers/admin.controller');






// Authentification/Administration
router.post('/signup', adminController.signUp);
router.post('/signin', adminController.signIn);
router.get('/logout', adminController.logOut);

// Gestion des Maisons
router.post('/add', adminController.addHouse);
router.get('/houses', adminController.getHouses);
router.get('/houses/:id', adminController.getHouseById);
router.put('/house/:id', adminController.updateHouse);
router.delete('/house/:id', adminController.deleteHouse);



// Gestion des Utilisateurs
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUsers);


// Gestion des Formulaires Utilisateurs
router.get('/forms', adminController.getAllForms); 

router.get('/forms/:formId/houses', adminController.getHousesByForm);

router.get('/form-visits', adminController.getFormVisits);

// Gestion des avis Utilisateurs
router.get('/avis', adminController.getAllAvis);
router.get('/avis/:id', adminController.getAvisById);


router.get('/dashboard', requireAuth, authorizeRoles('admin'), adminController.adminDashboard);

module.exports = router;
