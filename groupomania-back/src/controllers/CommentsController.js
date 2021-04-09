const {Post, Comment} = require('../models')

module.exports = {
  createComment (req, res, next) {
    const CommentObject = req.body.comment

    Comment.create({
      content: CommentObject.content,
      UserId: CommentObject.userId,
      PostId: CommentObject.postId,
      author: CommentObject.author
    })
      .then(comment => res.status(200).json({ comment }))
      .catch(error => res.status(500).json({ error }))
  },

  updateComment (req, res, next) {
    const CommentObject = req.body.comment

    // ici on ne veut que seul le contenu puisse etre modifié et pas les id 
    Comment.update({ 
      content: CommentObject.content
     }, {
      where: {
        id: req.params.commentId
      }
    })
      .then(() => {
        res.status(200).json({ message: "Commentaire Updated" })
      })
      .catch(error => res.status(500).json({ error }))
  },

  deleteComment (req, res, next) {
    Comment.findOne({ where: { id: req.params.commentId }})
      .then(comment => {
        Comment.destroy({ where: { id: comment.id }})
          .then(() => res.status(201).json({ message: `Le commentaire id: ${comment.id} à bien été supprimé`}))
          .catch(error => res.status(502).json({ error }))
      })
      .catch(error => res.status(400).json({ error }))
  }
}