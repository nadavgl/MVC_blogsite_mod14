const router = require('express').Router();

const post_routes = require('./post_routes')
const user_routes = require('./user_routes')
const view_routes = require('./view_routes')
const comment_routes = require('./comment_route') 

router.use('/', [view_routes, user_routes]);
router.use('/posts', post_routes)
router.use('/comments', comment_routes)

router.use('*',(req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

  module.exports = router

  