const jwt = require('jsonwebtoken');
const {Post, Comment} = require('../models')

module.exports = (req, res, next) => {
  console.log(req.url)
  
  const obecjtType = req.url.split('/')[1]

  console.log(obecjtType)
  try {

    if(obecjtType === 'comment') {
      Comment.findOne({ where : { id: req.params.commentId }})
        .then(comment => {
          console.log('user id before fct : ', comment)
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

  function checkUserId(object) {
    const userId = req.body.decodedUserId
    console.log(' User id du body : ', userId)
    console.log(' User id de lobjet  : ', object.UserId)


    if(object.UserId !== userId) {
      throw 'Il faut être propriétaire de cet objet pour pouvoir agir dessus'
    } else {
      next()
    }
  }
}
