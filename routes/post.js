const express = require('express'),
	path = require('path'),
	postController = require('../controllers/postController'),
	Post = require('../model/post'),
	router = express.Router(),
	{ route } = require('express/lib/application'),
	{ isLoggedIn, isPostAuthor } = require('../middleware');

const multer = require('multer'),
	{ storage } = require('../cloudinary/config'),
	upload = multer({ storage });

router.get('/posts', postController.searchPost);
router.get('/posts/new', isLoggedIn, postController.newPostForm);
router.get('/posts/:type', postController.indexType);
router.get('/posts/:type/:id', postController.showPost);
router.post('/posts', isLoggedIn, postController.makeNewPost);
router.get('/posts/:type/:id/edit', isLoggedIn, isPostAuthor, postController.editPostForm);
router.put('/posts/:type/:id', isLoggedIn, isPostAuthor, upload.single('image'), postController.updatePost);
router.delete('/posts/:type/:id', isLoggedIn, isPostAuthor, postController.destroyPost);
router.get('/posts/:type/:id/upvote', isLoggedIn, postController.upvote);
router.get('/posts/:type/:id/downvote', isLoggedIn, postController.downvote);

module.exports = router;
