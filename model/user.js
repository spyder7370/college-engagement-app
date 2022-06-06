const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		default: 'Not provided'
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	avatar: {
		type: String,
		default: '/img/default-user.webp'
	},
	about: {
		type: String,
		default: 'Nice to meet you! I am new here'
	}
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
