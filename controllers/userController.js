const Post = require('../model/post');
const User = require('../model/user');
const { cloudinary } = require('../cloudinary/config');

module.exports.showUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).populate('posts');
	res.render('users/show', { user });
};

module.exports.editUserForm = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	res.render('users/edit', { user });
};

module.exports.updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (req.file !== undefined) {
			req.body.user.avatar = req.file.path;
		}
		const user = await User.findByIdAndUpdate(id, { ...req.body.user });
		req.flash('success', 'Successfully updated your profile');
		res.redirect(`/users/${id}`);
	} catch (error) {
		console.log(error);
	}
};
