const Comment = require('../model/comment'),
	commentController = require('../controllers/commentController'),
	express = require('express'),
	path = require('path'),
	Post = require('../model/post'),
	router = express.Router(),
	{ route } = require('express/lib/application'),
	{ isLoggedIn, isCommentAuthor } = require('../middleware');

router.post('/posts/:type/:id/comments', isLoggedIn, commentController.makeNewComment);
router.delete('/posts/:type/:id/comments/:commentId', isLoggedIn, isCommentAuthor, commentController.destroyComment);

module.exports = router;
