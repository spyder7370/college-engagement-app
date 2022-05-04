const User = require("../model/user")

exports.logout = (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect("/");
}

exports.postSignUp = async (req, res) => {
    let fullName = req.body.fullName,
        email = req.body.email,
        password = req.body.password;

    let username = email.split("@")[0]
    
    const user = await User.create({
        name: fullName,
        email,
        password,
        admin: true,
        username: username,
        posts: [{}]
    })

    // console.log(user)
    req.session.isLoggedIn = true;
    res.render("/");
}

exports.postLogin = async (req, res) => {
    console.log(req.body.email, req.body.password)
    let user = await User.findOne({email: req.body.email, password: req.body.password});

    if (user) {
        req.session.isLoggedIn = true;
        res.redirect("/");
    } else 
        res.send("Wrong input")

    

}

exports.getLogin = (req, res) => { // res.setHeader('Set-Cookie','isLogged=True')
    res.render("login");
}
