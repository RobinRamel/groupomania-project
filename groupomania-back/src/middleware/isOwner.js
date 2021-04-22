const jwt = require('jsonwebtoken');
const {Post, Comment} = require('../models')

module.exports = (req, res, next) => {
  
  if(req.body.isAdmin === true) {
    next()
  } else {
    const obecjtType = req.url.split('/')[1]

  try {

    if(obecjtType === 'comment') {
      Comment.findOne({ where : { id: req.params.commentId }})
        .then(comment => {
          checkUserId(comment)
        })
        .catch(error => res.status(404).json({ error }))
    } else {
      Post.findOne({ where: { id: req.params.id } })
        .then(post => {
          checkUserId(post)
        })
        .catch(error => res.status(404).json({ error }))
    }


    } catch(error) {
      res.status(401).json({ error: error });
    }

  }

  
  function checkUserId(object) {
    const userId = req.body.decodedUserId

    if(object.UserId !== userId) {
      throw 'Il faut être propriétaire de cet objet pour pouvoir agir dessus'
    } else {
      next()
    }
  }
}
