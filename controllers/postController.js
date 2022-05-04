const Post = require("../model/post");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({});
        res.setHeader('Set-Cookie', `blogs=[{a,b,c}]`)
        res.render("blog.ejs", {blogs, isLoggedIn: req.session.isLoggedIn});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllNotices = (req, res) => {
    res.render("notice.ejs");
};
