const router = require('express').Router();
const comment_controller = require('../controllers/comment_controller');

// Add a comment
router.post('/add/:post_id', comment_controller.addComment);


module.exports = router;
