const Post = require('../model/post');
const User = require('../model/user');
const axios = require('axios').default;
const { cloudinary } = require('../cloudinary/config');

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// module.exports.indexAll = async (req, res) => {
// 	const posts = await Post.find({}).populate('author');
// 	if (!posts) return res.redirect('/404');
// 	const type = 'Post';
// 	res.render('posts/index.ejs', { posts, type });
// };

module.exports.indexAll = async (req, res) => {
	const posts = await Post.paginate(
		{},
		{
			page: req.query.page || 1,
			limit: 10,
			sort: '-_id'
		}
	);
	if (!posts) return res.redirect('/404');
	posts.page = Number(posts.page);
	let totalPages = posts.totalPages;
	let currentPage = posts.page;
	let startPage;
	let endPage;

	if (totalPages <= 10) {
		startPage = 1;
		endPage = totalPages;
	} else {
		if (currentPage <= 6) {
			startPage = 1;
			endPage = 10;
		} else if (currentPage + 4 >= totalPages) {
			startPage = totalPages - 9;
			endPage = totalPages;
		} else {
			startPage = currentPage - 5;
			endPage = currentPage + 4;
		}
	}
	const type = 'Post';
	res.render('posts/index', {
		posts,
		type,
		startPage,
		endPage,
		currentPage,
		totalPages
	});
};

module.exports.searchPost = async (req, res) => {
	let { search, type } = req.query;
	if (!search) search = '';
	if (!type) type = 'post';
	let url = `/posts?type=${type}&search=${search}`;
	if ((!search && !type) || (!search && type === 'post')) {
		// const posts = await Post.find({ type: { $ne: 'notice' } }).populate('author');
		const posts = await Post.paginate(
			{ type: { $ne: 'notice' } },
			{
				page: req.query.page || 1,
				limit: 12,
				sort: '-_id',
				populate: 'author'
			}
		);
		posts.page = Number(posts.page);
		let totalPages = posts.totalPages;
		let currentPage = posts.page;
		let startPage;
		let endPage;

		if (totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}
		const type = 'Post';
		return res.render('posts/search', {
			posts,
			type,
			url,
			startPage,
			endPage,
			currentPage,
			totalPages
		});
		// return res.render('posts/search', { posts, type });
	}
	if (type === 'notice') {
		if (!search) return res.redirect('/posts/notice');
		else {
			const regex = new RegExp(escapeRegex(req.query.search), 'gi');
			// const posts = await Post.find({ title: regex, type: 'notice' }).populate('author');
			const posts = await Post.paginate(
				{ title: regex, type: 'notice' },
				{
					page: req.query.page || 1,
					limit: 12,
					sort: '-_id',
					populate: 'author'
				}
			);
			posts.page = Number(posts.page);
			let totalPages = posts.totalPages;
			let currentPage = posts.page;
			let startPage;
			let endPage;

			if (totalPages <= 10) {
				startPage = 1;
				endPage = totalPages;
			} else {
				if (currentPage <= 6) {
					startPage = 1;
					endPage = 10;
				} else if (currentPage + 4 >= totalPages) {
					startPage = totalPages - 9;
					endPage = totalPages;
				} else {
					startPage = currentPage - 5;
					endPage = currentPage + 4;
				}
			}
			return res.render('posts/index', {
				posts,
				type,
				url,
				startPage,
				endPage,
				currentPage,
				totalPages
			});
			// return res.render('posts/index', { posts, type });
		}
	}

	let newType = type;
	if (type === 'post') {
		newType = { $ne: 'notice' };
	}
	if (!search) {
		// const posts = await Post.find({ type: newType }).populate('author');
		const posts = await Post.paginate(
			{ type: newType },
			{
				page: req.query.page || 1,
				limit: 12,
				sort: '-_id',
				populate: 'author'
			}
		);
		posts.page = Number(posts.page);
		let totalPages = posts.totalPages;
		let currentPage = posts.page;
		let startPage;
		let endPage;

		if (totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}
		return res.render('posts/search', {
			posts,
			type,
			url,
			startPage,
			endPage,
			currentPage,
			totalPages
		});
		// return res.render('posts/search', { posts, type });
	} else {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		// const posts = await Post.find({ title: regex, type: newType }).populate('author');
		const posts = await Post.paginate(
			{ title: regex, type: newType },
			{
				page: req.query.page || 1,
				limit: 12,
				sort: '-_id',
				populate: 'author'
			}
		);
		posts.page = Number(posts.page);
		let totalPages = posts.totalPages;
		let currentPage = posts.page;
		let startPage;
		let endPage;

		if (totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}
		return res.render('posts/search', {
			posts,
			type,
			url,
			startPage,
			endPage,
			currentPage,
			totalPages
		});
		// return res.render('posts/search', { posts, type });
	}

	res.send(req.query);
};

module.exports.newPostForm = (req, res) => {
	res.render('posts/new');
};

module.exports.indexType = async (req, res) => {
	const { type } = req.params;
	if (!(type === 'blog' || type === 'interview-experience' || type === 'notice')) {
		return res.redirect('/404');
	}
	try {
		// const posts = await Post.find({ type: type }).populate('author');
		const posts = await Post.paginate(
			{ type: type },
			{
				page: req.query.page || 1,
				limit: 12,
				sort: '-_id',
				populate: 'author'
			}
		);
		if (!posts) return res.redirect('/404');
		posts.page = Number(posts.page);
		let totalPages = posts.totalPages;
		let currentPage = posts.page;
		let startPage;
		let endPage;

		if (totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}
		res.render('posts/index', {
			posts,
			type,
			startPage,
			endPage,
			currentPage,
			totalPages
		});
	} catch (error) {
		console.log(error.message);
		req.flash('error', 'Something went wrong in the database');
		res.redirect('back');
	}
};

module.exports.showPost = async (req, res) => {
	try {
		const { type, id } = req.params;
		const post = await Post.findById(id)
			.populate({
				path: 'comments',
				populate: {
					path: 'author'
				}
			})
			.populate('author');
		let likeExists = 'selected',
			dislikeExists = 'selected';
		if (!req.user) {
			likeExists = '';
			dislikeExists = '';
		} else {
			let exists = await Post.findOne({ _id: id, upvotes: { _id: req.user._id } });
			if (!exists) {
				likeExists = '';
			}
			exists = await Post.findOne({ _id: id, downvotes: { _id: req.user._id } });
			if (!exists) {
				dislikeExists = '';
			}
		}
		res.render('posts/show', { post, type, likeExists, dislikeExists });
	} catch (error) {
		console.log(error);
		return res.redirect('/404');
	}
};

module.exports.makeNewPost = async (req, res) => {
	try {
		const post = await new Post(req.body.post);
		post.author = req.user._id;
		const user = await User.findById(req.user._id);
		user.posts.push(post);
		await user.save();
		await post.save();
		req.flash('success', 'Successfully created a new post');
		if (post.type === 'notice') {
			return res.redirect('/posts/notice');
		}
		res.redirect(`/posts/${post.type}/${post._id}`);
	} catch (err) {
		req.flash('error', 'An error occured in the database');
		res.redirect('back');
	}
};

module.exports.editPostForm = async (req, res) => {
	try {
		const { type, id } = req.params;
		const post = await Post.findById(id);
		const arr = post.title.split(' ');
		const imgs = [];
		for (let str of arr) {
			if (str.length < 4) continue;
			const result = await axios.get(
				`https://api.unsplash.com/search/photos?query=${str}&page=1&per_page=30&orientation=landscape&client_id=${process
					.env.UNSPLASH_TOKEN}`
			);
			if (result.data.results.length == 0) continue;
			for (let x = 0; x < 3; x++) {
				let x = result.data.results[Math.floor(Math.random() * result.data.results.length)];
				imgs.push(x.urls.raw);
			}
		}
		res.render('posts/edit', { post, type, imgs });
	} catch (error) {
		console.log(error);
		return res.redirect('/404');
	}
};

module.exports.updatePost = async (req, res) => {
	try {
		const { type, id } = req.params;
		if (req.body.imageType === 'custom') {
			// cloudinary
			req.body.post.image = req.file.path;
		} else {
			// normal update
		}
		req.body.post.date = Date.now();
		const post = await Post.findByIdAndUpdate(id, { ...req.body.post });
		req.flash('success', 'Successfully updated the post');
		res.redirect(`/posts/${type}/${id}`);
	} catch (err) {
		req.flash('error', 'An error occured in the database');
		res.redirect('back');
	}
};

module.exports.destroyPost = async (req, res) => {
	try {
		const { type, id } = req.params;
		await Post.findByIdAndDelete(id);
		req.flash('success', 'Successfully deleted the post');
		res.redirect(`/posts/${type}`);
	} catch (err) {
		req.flash('error', 'An error occured in the database');
		res.redirect('back');
	}
};

module.exports.upvote = async (req, res) => {
	try {
		const { type, id } = req.params;
		const exists = await Post.findOne({ _id: id, upvotes: { _id: req.user._id } });
		if (!exists) {
			console.log('adding like');
			const post = await Post.findByIdAndUpdate(id, {
				$pull: { downvotes: req.user._id },
				$push: { upvotes: req.user._id }
			});
			res.redirect(`/posts/${type}/${id}`);
		} else {
			console.log('exists');
			const post = await Post.findByIdAndUpdate(id, {
				$pull: { upvotes: req.user._id }
			});
			res.redirect(`/posts/${type}/${id}`);
		}
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		res.redirect('back');
	}
};

module.exports.downvote = async (req, res) => {
	try {
		const { type, id } = req.params;
		const exists = await Post.findOne({ _id: id, downvotes: { _id: req.user._id } });
		if (!exists) {
			console.log('adding unlike');
			const post = await Post.findByIdAndUpdate(id, {
				$pull: { upvotes: req.user._id },
				$push: { downvotes: req.user._id }
			});
			res.redirect(`/posts/${type}/${id}`);
		} else {
			console.log('exists');
			const post = await Post.findByIdAndUpdate(id, {
				$pull: { downvotes: req.user._id }
			});
			res.redirect(`/posts/${type}/${id}`);
		}
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		res.redirect('back');
	}
};
