const express = require('express'),
	path = require('path'),
	userController = require('../controllers/userController'),
	Post = require('../model/post'),
	router = express.Router(),
	User = require('../model/user'),
	{ route } = require('express/lib/application'),
	{ isLoggedIn, isPostAuthor } = require('../middleware');

const multer = require('multer'),
	{ storage } = require('../cloudinary/config'),
	upload = multer({ storage });

router.get('/users/:id', userController.showUser);
router.get('/users/:id/edit', userController.editUserForm);
router.put('/users/:id', upload.single('image'), userController.updateUser);

module.exports = router;
