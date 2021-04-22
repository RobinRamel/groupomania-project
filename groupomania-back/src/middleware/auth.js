const jwt = require('jsonwebtoken')
const config = require('../config/config')


module.exports = (req, res, next) => {
  const autHeader = req.headers.authorization

  if (autHeader) {
    const token = autHeader.split(' ')[1]

    jwt.verify(token, config.authentication.jwtSecret, function(err, decoded) {
      if (err) {
        console.log(err)
        res.status(501).json({ err })
      }

      req.body.decodedUserId = decoded.id
      next()
    })

  } else {
    res.status(500).json({ error: "Accès interdit"})
  }

}
