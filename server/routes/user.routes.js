const UserModel = require('../models/user.model');
const router = require('express').Router();
const { requireAuth, authorizeRoles } = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');




//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/googleAuth", authController.googleAuth);
router.get('/logout', authController.logOut);

router.post('/search', authController.findHouses); 
router.get('/houses', authController.getHouses);
router.post("/resetpassword", authController.resetPassword);
router.post("/NewPassword/:id/:token", authController.NewPassword);



router.post('/favorites/add/:id', authController.addToFavorites);
router.post('/favorites/remove', authController.removeFromFavorites);
router.put('/:id/updateFav', authController.updateFavorites);
router.get('/:userId', authController.getFavorites);

router.get('/dashboard', requireAuth, authorizeRoles('user'), authController.userDashboard);




module.exports = router;