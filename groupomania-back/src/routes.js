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
const multer = require('./middleware/multer-config')
const isAdmin = require('./middleware/isAdmin')

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
  router.post('/', auth, multer, PostsController.createPost),
  router.put('/:id', auth, isOwner, multer, PostsController.updatePost),
  router.delete('/:id', auth, isAdmin, isOwner, PostsController.deletePost),
  //COMMENT RELATED
  router.post('/comment', auth, CommentController.createComment),
  router.put('/comment/:commentId', auth, isOwner, CommentController.updateComment),
  router.delete('/comment/:commentId', auth, isAdmin, isOwner, CommentController.deleteComment)


  module.exports = router