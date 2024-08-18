const router = require('express').Router();

const post_controller = require('../controllers/post_controller')

// Create Blog Post
router.post('/add', post_controller.createPost)

// Update Post
router.put('/edit/:post_id', post_controller.updatePost)

// Delete Post
router.delete('/remove/:post_id', post_controller.deletePost)


module.exports = router