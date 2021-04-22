const {Post, Comment, sequelize} = require('../models')
const config = require('../config/config')
const fs = require('fs')


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
    const PostObject = req.body

    Post.create({
      title: PostObject.title,
      content: PostObject.content,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      UserId: PostObject.userId,
      author: PostObject.author
    })
      .then((post) => res.status(201).json({ post }))
      .catch(error => res.status(400).json({ error }))
  },

  updatePost (req, res, next) {
    const PostObject = req.file ? 
    {
      ...req.body,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };

    if(req.file) {
      Post.findOne({ where: { id: req.params.id }})
        .then(post => {
          const PostToRemoveImage = post.dataValues
          const filename = PostToRemoveImage.image.split('/images/')[1]

          fs.unlink(`images/${filename}`, () => {
              Post.update({ ...PostObject }, { where: { id: req.params.id }})
                .then(() => res.status(201).json({ message: `Le post id: ${req.params.id} à bien été mis à jour`}))
                .catch(error => res.status(501).json({ error }))
          })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
      Post.update({ ...PostObject }, { where: { id: req.params.id }})
        .then(() => res.status(201).json({ message: `Le post id: ${req.params.id} à bien été mis à jour`}))
        .catch(error => res.status(501).json({ error }))
    }
  },

  deletePost (req, res, next) {
    Post.findOne({ where: { id: req.params.id }})
      .then(post => {
        const PostObject = post.dataValues
        const filename = PostObject.image.split('/images/')[1]
        
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: post.id } })
            .then(() => res.status(201).json({ message: `Le post id: ${post.id} a été supprimé de la base de données`}))
            .catch(error => res.status(501).json({ error }))
        })
        
      })
      .catch(error => res.status(500).json({ error }))
  },
}