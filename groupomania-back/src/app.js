const express = require('express')
const bodyParser = require('body-parser')
const {sequelize} = require('./models')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const routes = require('./routes')

const path = require('path');


sequelize.authenticate()
    .then(() => {
        console.log('Connection réussie à la base de données');
    }).catch((error) => {
        console.log('Impossible de se connecter : ', error);
    });

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
app.use(bodyParser.json())
app.use(cors())

app.use('/images', express.static(path.join(require('path').resolve(__dirname, '..'), 'images')))

// Etant donné que ce qu'exporte routes.js est une fonction on peut directement lui passer le parametre de cette manière
app.use('', routes)

// A utiliser en cas d'erreur
// app.use(function (err, req, res, next) {
//     console.log(err)
//     console.log('This is the invalid field ->', err.field)
//     next(err)
//   })
// .sync({ force: true }) pour flush la BDD
sequelize.sync()
    .then(() => {
        app.listen(config.port);
        console.log(`Server started on port : ${config.port}`)
    })
    .catch((error) => {
        console.log(`Erreur de synchro : ${error}` )
    })
