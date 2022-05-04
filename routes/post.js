const express = require("express");
const path = require("path");
const postController = require('../controllers/postController')
const router = express.Router();

router.get("/blog", postController.getAllBlogs);

router.get("/notice", postController.getAllNotices );

module.exports = router;
