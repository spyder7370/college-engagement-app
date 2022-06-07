const Post = require('./model/post');
const Comment = require('./model/comment');

module.exports.isLoggedIn = async (req, res, next) => {
	if (!req.isAuthenticated()) {
		// store the url requested
		req.flash('error', 'You need to be logged in first');
		return res.redirect('/login');
	}
	next();
};

module.exports.isPostAuthor = async (req, res, next) => {
	const { type, id } = req.params;
	const post = await Post.findById(id);
	if (!post.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect(`/posts/${type}/${id}`);
	}
	next();
};

module.exports.isCommentAuthor = async (req, res, next) => {
	const { type, id, commentId } = req.params;
	const comment = await Comment.findById(commentId);
	if (!comment.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect(`/posts/${type}/${id}`);
	}
	next();
};
