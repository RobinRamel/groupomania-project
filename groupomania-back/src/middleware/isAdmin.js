const { User } = require('../models')

// Permet d'outrepasser le middleWare isOwner sur les routes de suppression 
// pour permettre a l'admin de modérer sans pour autant modifier le contenu des utilisateurs 

module.exports = (req, res, next) => {
  // Doit nécéssairement placé apres le Midlleware Auth pour avoir acces à : req.body.decodedUserId
  User.findOne({ where: { id: req.body.decodedUserId }})
    .then(user => {
      if(user.role === 'admin') {
        req.body.isAdmin = true;
        next();
      } else {
        req.body.isAdmin = false;
        next();
      }
    })
    .catch(error => res.status(400).json({
      message: 'Utilisateur introuvable, ce n\'est donc pas l\'admin',
      error
    }))
}