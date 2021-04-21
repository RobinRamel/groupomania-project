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
      console.log("TU PEUX PASSER LA MIFF", decoded)
      next()
    })

  } else {
    res.status(500).json({ error: "Accès interdit"})
  }

//   try {
//     const tokenRetrieved = req.headers.authorization.split(' ')[1];
//     console.log('token retrieved : ',tokenRetrieved)
//     console.log('token from Secret : ', config.authentication.jwtSecret) 
//     console.log('token decoded : ', jwt.verify(tokenRetrieved, config.authentication.jwtSecret)) 
//     const tokenDecoded = jwt.verify(tokenRetrieved, config.authentication.jwtSecret);
//     // on recup l'userId qu'on a précedemment envoyer dans le payload de la method sign de JsonWebToken
//     const userId = tokenDecoded.user.id;
//     console.log(req.body.userId)
//     req.body.decodedUserId = userId;
//     console.log(userId)

//     if ( req.body.userId && req.body.userId !== userId ) {
//         throw 'User ID invalide';
//     } else {
//         next();
//     }
// } catch(error) {
//     res.status(401).json({
//         error: error
//     });
// }

}
