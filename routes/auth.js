const authController = require('../controllers/authController'),
	express = require('express'),
	passport = require('passport'),
	router = express.Router(),
	User = require('../model/user'),
	{ route } = require('express/lib/application');

router.get('/login', authController.getLoginForm);
router.get('/signup', authController.getRegisterForm);
router.post('/signup', authController.registerUser);
router.post(
	'/login',
	passport.authenticate('local', {
		successFlash: 'Welcome back',
		failureFlash: true,
		failureRedirect: '/login'
	}),
	authController.loginUser
);
router.get('/logout', authController.logoutUser);

module.exports = router;
