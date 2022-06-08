if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const bodyParser = require('body-parser'),
	express = require('express'),
	flash = require('connect-flash'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	MongoDBStore = require('connect-mongodb-session')(session),
	path = require('path'),
	passport = require('passport'),
	LocalStrategy = require('passport-local');

const MONGODB_URI = process.env.MONGODB_URI;
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });
mongoose.connect(MONGODB_URI, () => {
	console.log('connected to db');
});

const app = express(),
	req = require('express/lib/request');

const authRoutes = require('./routes/auth'),
	postRoutes = require('./routes/post'),
	commentRoutes = require('./routes/comment'),
	userRoutes = require('./routes/user');

const Post = require('./model/post'),
	User = require('./model/user');

app.locals.moment = require('moment');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: store
	})
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	// console.log(req.user);
	next();
});

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.get('/', async (req, res) => {
	// const isLoggedIn = req.get('Cookie').split(";")[1].trim().split("=")[1] == 'True';
	const isLoggedIn = req.session.isLoggedIn;
	const blogs = await Post.find({ type: 'blog' }).sort({ _id: -1 }).limit(2);
	const interview = await Post.findOne({ type: 'interview-experience' }).sort({ _id: -1 });
	const notice = await Post.findOne({ type: 'notice' }).sort({ _id: -1 });
	res.render('home.ejs', { isLoggedIn, blogs, interview, notice });
});
app.get('/404', (req, res) => {
	res.render('404');
});
app.get('*', (req, res) => {
	res.redirect('/404');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log('APP STARTED');
});
