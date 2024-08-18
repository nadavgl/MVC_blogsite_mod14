const { User, Post, Comment } = require('../models');
const { format } = require('date-fns');

module.exports = {
    showHomePage(req, res) {
        res.render('homepage', {
            title: 'Blog - Homepage'
        });
    },

    showRegisterPage(req, res) {
        res.render('register', {
            title: 'Blog - Register',
            register: true
        });
    },

    showLoginPage(req, res) {
        res.render('login', {
            title: 'Blog - Log In',
            login: true
        });
    },

    async showDashboardPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                include: [{
                    model:Post,
                    include:[Comment, User]
                }] // Eager load posts
            });
 
            // Format the createdAt date for each post
            const posts = user.posts.map(post => {
                return {
                    ...post.get({ plain: true }),
                    formattedDate: format(new Date(post.createdAt), 'dd/MM/yyyy')
                };
            });
            console.log(posts)
            res.render('dashboard', {
                title: 'Blog - Dashboard',
                user: user.get({ plain: true }),
                posts, // Pass the formatted posts
                user_page: true,
                dashboard: true
            });
        } catch (error) {
            console.error('Error fetching user and posts:', error);
            res.status(500).send('Internal Server Error');
        }
    },



    async showAddPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });

            res.render('add', {
                user: user.get({ plain: true }),
                title: 'Blog - Add Post',
                user_page: true,
                add: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error');
        }
    }, async showEditPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });
            const post = await Post.findByPk(req.params.post_id);
            console.log(post)

            res.render('edit', {
                user: user.get({ plain: true }),
                title: 'Blog - Edit Post',
                post: post.get({ plain: true }),
                user_page: true,
                search: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error');
        }
    }

};
