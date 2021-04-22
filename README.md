# groupomania-p7

## Project setup
```
cd groupomania-front/
npm install

cd groupomania-back/
npm install
```

## DB INIT ##
Pour l'initialisation de la DB, de sa structure et d'un jeu de données de base, veuillez utiliser le fichier SQL
- groupomania.sql

## BACK DB & INFOS 
Créez un fichier .env dans groupomania-back/ avec ces variables à remplacer par vos infos de connexion 
```
HOST=          the host 
USERDB=        user of db 
PASSWORD=      the password
DB=            the DB 
DIALECT=       mysql
SECRET_TOKEN=  the secret token u want 
```

## ON WINDOWS ##
Pour Windows
Dans le fichier groupomania-back/src/config/config.js
commentez la ligne suivante : 
```
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      //port: '8889'  <------------------------------------------ celle ci
    },
  },
  authentication: {
    jwtSecret: process.env.SECRET_TOKEN
  }
}
```


## START PROJECT ##
Pour faire tourner le front dans : groupomania-front/
```
npm run serve
```
 
Pour faire tourner le back dans : groupomania-back/
```
nodemon
```