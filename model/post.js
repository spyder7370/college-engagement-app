const mongoose = require('mongoose'),
	Comment = require('./comment');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: [ 'blog', 'notice', 'interview-experience' ],
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	},
	upvotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	downvotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	image: {
		type: String,
		default: '/img/default-blog.jpg'
	}
});

postSchema.post('findOneAndDelete', async (doc) => {
	if (doc) {
		await Comment.deleteMany({
			_id: {
				$in: doc.comments
			}
		});
	}
});
module.exports = mongoose.model('Post', postSchema);
