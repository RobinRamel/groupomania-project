const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const Post = require('./Post')
const db = {}

// const Post = require('./Post')

// console.log(Post);

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  // __dirname = le path complet du dossier contenant le fichier qui s'execute (index.js ici) ce qui nous donne le path jusque /models
  // on lis donc ce path 
  .readdirSync(__dirname)
  // tout les fichiers (de models) sauf index.js
  .filter((file) => 
    file !== 'index.js'
  )
  .forEach((file) => {    // on dis a sequelize d'importer chacun des fichiers de models qui n'est pas index.js
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    // enfin on les définis comme des modèles 
    db[model.name] = model
  }) 

  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize
  
module.exports = db