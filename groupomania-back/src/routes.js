const AuthentificationController = require('./controllers/AuthenticationController')

const AuthentificationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register', 
  AuthentificationControllerPolicy.register,
  AuthentificationController.register
  ),
  app.post('/login', AuthentificationController.login)
}