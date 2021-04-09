const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const Schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(
        // on veut matcher min, maj, chiffres min 8 characteres max 32 
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{2,18}$')
      ),
    })

    const {error} = Schema.validate(req.body)

    if (error) {

      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).json({
            error: "Vous devez entrer une adresse E-mail valide"
          })
          break;
        case 'password':
          res.status(400).json({
            error: 
            `
            Le mot de passe fournis ne respecte pas l'une des règles suivantes : 
            <br>
            1. Il ne doit contenir que des Lettres (Min ou Maj) et des Chiffres
            <br>
            2. Il doit être d'une longueur comprise entre 8 et 32 charactères
            `
          })
          break;
        case 'username':
          res.status(400).json({
            error: 
            `
            Le nom d'utilisateur fournis ne respecte pas l'une des règles suivantes : 
            <br>
            1. Il ne doit contenir que des Lettres (Min ou Maj) et des Chiffres
            <br>
            2. Il doit être d'une longueur comprise entre 2 et 18 charactères
            `
          })
          break;
        default:
          res.status(400).json({
            error: "Quelques chose s'est mal passé..."
          })
          break;
      }

    } else {
      next()
    }
  }
}
