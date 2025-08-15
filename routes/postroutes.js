const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

router.post('/post', postController.createPost)
router.get('/post', postController.getAllPosts)
router.get('/post/id', postController.getPostById)
router.put('/post/update', postController.updatePost)
router.delete('/postd', postController.deletePost)

module.exports = router;    