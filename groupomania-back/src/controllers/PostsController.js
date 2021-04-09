const {Post, Comment, sequelize} = require('../models')
const config = require('../config/config')


module.exports = {

  getAllPosts (req, res, next) {
    Post.findAll({ 
      include: Comment,
      order: [
        ['createdAt', 'DESC']
      ] 
    })
      .then(post => res.status(200).json( post ))
      .catch(error => res.status(400).json({ error }))
  },

  getOnePost (req, res, next) {
    Post.findOne({ where: { id: req.params.id }})
      .then(post => res.status(201).json({post}))
      .catch(error => res.status(404).json({ error }))
  },

  createPost (req, res, next) {
    const PostObject = req.body.post
    console.log(PostObject)

    Post.create({
      title: PostObject.title,
      content: PostObject.content,
      image: PostObject.image,
      UserId: PostObject.userId,
      author: PostObject.author
    })
      .then((post) => res.status(201).json({ post }))
      .catch(error => res.status(400).json({ error }))
  },

  updatePost (req, res, next) {
    console.log(req.body)
    const PostObject = req.body.post
    // Je définis les propriétés que l'on peut modifier pour eviter qu'on modifie l'UserId associé au post 
    Post.update({ 
      title: PostObject.title,
      content: PostObject.content,
      image: PostObject.image,
     }, {
      where: {
        id: req.params.id
      }
    })
      .then(() => res.status(201).json({ message: `Le post id: ${req.params.id} à bien été mis à jour`}))
      .catch(error => res.status(501).json({ error }))
  },

  deletePost (req, res, next) {
    Post.findOne({ where: { id: req.params.id }})
      .then(post => {
        Post.destroy({
          where: {
            id: post.id
          }
        })
          .then(() => res.status(201).json({ message: `Le post id: ${post.id} a été supprimé de la base de données`}))
          .catch(error => res.status(501).json({ error }))
      })
      .catch(error => res.status(500).json({ error }))
  },
}