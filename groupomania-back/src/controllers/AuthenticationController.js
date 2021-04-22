const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// console.log(config.authentication.jwtSecret)

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  register (req, res) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const userCrypt = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          role: 'basic'
        }

        User.create(userCrypt)
          .then( user => {
            userJSON = user.toJSON()
            res.status(200).send({
              user: userJSON,
              token: jwtSignUser(userJSON)
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

            const userJSON = user.toJSON()
            res.status(200).json({
              user: userJSON,
              token: jwtSignUser(userJSON) 
            })
          })
          .catch(error => res.status(500).json( error ))
      })
      .catch(error => res.status(400).json( error ))
  }
}