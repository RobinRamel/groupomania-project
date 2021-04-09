const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

  const autHeader = req.headers.authorization

  if (autHeader) {
    const token = autHeader.split(' ')[1]

    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if (err) {
        res.status(501).json({ err })
      }
      console.log("TU PEUX PASSER LA MIFF", decoded)
      next()
    })

  } else {
    res.status(500).json({ error: "Accès interdit"})
  }
}