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
const isOwner = require('./middleware/isOwner')

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
  router.post('/', auth, PostsController.createPost),
  router.put('/:id', auth, isOwner, PostsController.updatePost),
  router.delete('/:id', auth, isOwner, PostsController.deletePost),
  //COMMENT RELATED
  router.post('/comment', auth, CommentController.createComment),
  router.put('/comment/:commentId', auth, isOwner, CommentController.updateComment),
  router.delete('/comment/:commentId', auth, isOwner, CommentController.deleteComment)


  module.exports = router