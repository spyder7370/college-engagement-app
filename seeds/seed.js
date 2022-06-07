const mongoose = require('mongoose');
const Post = require('../model/post');
// const cities = require('./cities');
// const { places, descriptors } = require('./helper');

mongoose
	.connect('mongodb+srv://splicer:howyoudoin@cluster0.szb8fvo.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log('DB working!'))
	.catch((error) => console.log(error));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Post.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const post = await new Post({
			title: 'Google',
			author: '629ebd2b4c5353c253a948d9',
			type: 'interview-experience',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minus recusandae id rem dicta ipsa odit eligendi, placeat culpa reprehenderit voluptas doloremque laboriosam. Iste molestias labore praesentium. Saepe, deleniti magnam? Iste quibusdam incidunt minima ipsa unde enim similique excepturi, placeat dolores quisquam, sit, saepe doloribus omnis quaerat accusamus inventore aperiam veritatis cumque id qui ullam magni libero! Tenetur, ullam voluptate. Minima veritatis rem sint exercitationem impedit animi et aspernatur ea laudantium repellendus illum, sequi quas doloremque, tenetur omnis nesciunt. Adipisci perferendis repellendus, quibusdam expedita atque quasi aperiam! Saepe, quod eligendi. Accusantium ipsa asperiores itaque aspernatur provident quo rerum tempora veritatis quibusdam, praesentium ex doloremque. Doloremque perferendis eligendi tempore repudiandae alias velit accusamus in nemo esse fugit ipsum, recusandae architecto fugiat? Nemo in sequi odit quasi? Velit saepe reprehenderit, sint soluta eligendi adipisci voluptatibus tempora sit nostrum minima asperiores tempore deleniti. Numquam molestiae fugiat similique ea rerum atque, beatae veniam quo?'
		});
		await post.save();
	}
	for (let i = 0; i < 50; i++) {
		const post = await new Post({
			title: 'Maharashtra',
			author: '629ebd2b4c5353c253a948d9',
			type: 'blog',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minus recusandae id rem dicta ipsa odit eligendi, placeat culpa reprehenderit voluptas doloremque laboriosam. Iste molestias labore praesentium. Saepe, deleniti magnam? Iste quibusdam incidunt minima ipsa unde enim similique excepturi, placeat dolores quisquam, sit, saepe doloribus omnis quaerat accusamus inventore aperiam veritatis cumque id qui ullam magni libero! Tenetur, ullam voluptate. Minima veritatis rem sint exercitationem impedit animi et aspernatur ea laudantium repellendus illum, sequi quas doloremque, tenetur omnis nesciunt. Adipisci perferendis repellendus, quibusdam expedita atque quasi aperiam! Saepe, quod eligendi. Accusantium ipsa asperiores itaque aspernatur provident quo rerum tempora veritatis quibusdam, praesentium ex doloremque. Doloremque perferendis eligendi tempore repudiandae alias velit accusamus in nemo esse fugit ipsum, recusandae architecto fugiat? Nemo in sequi odit quasi? Velit saepe reprehenderit, sint soluta eligendi adipisci voluptatibus tempora sit nostrum minima asperiores tempore deleniti. Numquam molestiae fugiat similique ea rerum atque, beatae veniam quo?'
		});
		await post.save();
	}
	for (let i = 0; i < 50; i++) {
		const post = await new Post({
			title: 'Warning!!!',
			author: '629ebd2b4c5353c253a948d9',
			type: 'notice',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minus recusandae id rem dicta ipsa odit eligendi, placeat culpa reprehenderit voluptas doloremque laboriosam. Iste molestias labore praesentium. Saepe, deleniti magnam? Iste quibusdam incidunt minima ipsa unde enim similique excepturi, placeat dolores quisquam, sit, saepe doloribus omnis quaerat accusamus inventore aperiam veritatis cumque id qui ullam magni libero! Tenetur, ullam voluptate. Minima veritatis rem sint exercitationem impedit animi et aspernatur ea laudantium repellendus illum, sequi quas doloremque, tenetur omnis nesciunt. Adipisci perferendis repellendus, quibusdam expedita atque quasi aperiam! Saepe, quod eligendi. Accusantium ipsa asperiores itaque aspernatur provident quo rerum tempora veritatis quibusdam, praesentium ex doloremque. Doloremque perferendis eligendi tempore repudiandae alias velit accusamus in nemo esse fugit ipsum, recusandae architecto fugiat? Nemo in sequi odit quasi? Velit saepe reprehenderit, sint soluta eligendi adipisci voluptatibus tempora sit nostrum minima asperiores tempore deleniti. Numquam molestiae fugiat similique ea rerum atque, beatae veniam quo?'
		});
		await post.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
