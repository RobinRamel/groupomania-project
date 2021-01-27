const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

  register (req, res) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const userCrypt = {
          username: req.body.username,
          email: req.body.email,
          password: hash
        }

        User.create(userCrypt)
          .then(() => {
            res.status(200).json({
              message: "Utilisateur crée avec succès"
            })
          })
          .catch(error => res.status(400).json({ error: error.errors[0].message }))

      })
      .catch( error => res.status(500).json( error ))
  },

  login (req, res) {
    User.findOne({ where: { email: req.body.email }})
      .then(user => {

        if (!user) {
          res.status(401).json({ error: "Utilisateur introuvable" })
        } 

        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            console.log(valid)
            if (!valid) {
              res.status(401).json({
                error: "Mot de passe incorrect"
              })
            }

            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
              )
            })
          })
          .catch(error => res.status(500).json( error ))
      })
      .catch(error => res.status(400).json( error ))
  }
}