const express = require('express')
const router = express.Router()
// CONTROLLERS
const AuthentificationController = require('./controllers/AuthenticationController')
const PostsController = require('./controllers/PostsController')
const CommentController = require('./controllers/CommentsController')
// POLICY CONTROLLERS 
const AuthentificationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
//MIDDLEWARES
const auth = require('./middleware/auth')

  // ====== ROUTES ======= //

  // AUTHENTIFICATION
  router.post('/register', 
  AuthentificationControllerPolicy.register,
  AuthentificationController.register
  ),
  router.post('/login', AuthentificationController.login),
  //POST RELATED
  router.get('/', PostsController.getAllPosts ),
  router.get('/:id', PostsController.getOnePost),
  router.post('/', PostsController.createPost),
  router.put('/:id', PostsController.updatePost),
  router.delete('/:id', PostsController.deletePost),
  //COMMENT RELATED
  router.post('/comment', CommentController.createComment),
  router.put('/comment/:commentId', CommentController.updateComment),
  router.delete('/comment/:commentId', CommentController.deleteComment)


  module.exports = router