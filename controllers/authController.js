const User = require('../model/user');

module.exports.getLoginForm = (req, res) => {
	res.render('auth/login');
};

module.exports.getRegisterForm = (req, res) => {
	res.render('auth/signup');
};

module.exports.registerUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		// const username = email.split('@')[0];
		const user = await new User({ email, username });
		const registeredUser = await User.register(user, password);
		// console.log(registeredUser);
		// user.name = fullName;
		await user.save();
		req.login(registeredUser, (err) => {
			if (err) {
				req.flash('error', 'Some error occured while authenticating');
				return res.redirect('/signup');
			}
			req.flash('success', `Welcome ${username}`);
			res.redirect('/');
		});
	} catch (err) {
		req.flash('error', err.message);
		res.redirect('/signup');
	}
};

module.exports.loginUser = (req, res) => {
	res.redirect('/');
};

module.exports.logoutUser = (req, res) => {
	req.logout();
	req.flash('success', 'See you later');
	res.redirect('/');
};
