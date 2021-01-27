const express = require('express')
const bodyParser = require('body-parser')
const {sequelize} = require('./models')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

// const path = require('path');


sequelize.authenticate()
    .then(() => {
        console.log('Connection réussie à la base de données');
    }).catch((error) => {
        console.log('Impossible de se connecter : ', error);
    });

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Etant donné que ce qu'exporte routes.js est une fonction on peut directement lui passer le parametre de cette manière
require('./routes')(app)


sequelize.sync()
    .then(() => {
        app.listen(config.port);
        console.log(`Server started on port : ${config.port}`)
    })
    .catch((error) => {
        console.log(`Erreur de synchro : ${error}` )
    })
