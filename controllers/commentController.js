const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.makeNewComment = async (req, res) => {
	try {
		const comment = await new Comment(req.body.comment);
		const post = await Post.findById(req.params.id);
		comment.author = req.user._id;
		if (!post) return res.redirect('/404');
		post.comments.push(comment);
		await comment.save();
		await post.save();
		req.flash('success', 'Successfully added a new comment');
		res.redirect(`/posts/${req.params.type}/${req.params.id}`);
	} catch (error) {
		req.flash('error', 'An error occured in the database');
		res.redirect('back');
	}
};

module.exports.destroyComment = async (req, res) => {
	try {
		const { type, id, commentId } = req.params;
		await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
		await Comment.findByIdAndDelete(commentId);
		req.flash('success', 'Successfully deleted the comment');
		res.redirect(`/posts/${req.params.type}/${req.params.id}`);
	} catch (error) {
		req.flash('error', 'An error occured in the database');
		res.redirect('back');
	}
};
