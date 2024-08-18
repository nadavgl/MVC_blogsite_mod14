const { Comment } = require('../models');

module.exports = {
    async addComment(req, res) {
        try {
            // Create a new comment
            const newComment = await Comment.create({
                content: req.body.content,
                postId: req.params.post_id,
                userId: req.session.user_id
            });

            // Send back the newly created comment as JSON
            // res.json({
            //     content: newComment.content,
            //     // Include other fields as necessary, like user information or creation date
            // });
            res.redirect('/dashboard')
        } catch (error) {
            console.log('Error adding comment:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};
