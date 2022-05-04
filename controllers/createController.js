const Post = require("../model/post");

exports.getInputForm =(req, res) => {
    res.render("create-post.ejs");
}

exports.createPost = async (req, res) => {
    console.log(req.body.title, req.body.content);
    let postData = new Post({
        title: req.body.title,
        content: req.body.content,
        type: "Blog",
        author: "Mukul",
        date: new Date(),
        upvote: 0
    })

    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            type: "Blog",
            author: "Mukul",
            date: new Date(),
            upvote: 0
        })
        const posts = await Post.find({});
        console.log(posts);
        res.render("posts.ejs", {posts: posts});
    } catch (err) {
        console.log(err)
    }
}
