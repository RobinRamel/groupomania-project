# groupomania-p7

## Project setup
```
cd groupomania-front/
npm install
npm run serve


cd groupomania-back/
npm install
nodemon
```

## BACK DB & INFOS 
Make a .env in groupomania-back/ folder with : 
```
HOST= the host 
USERDB= user of db 
PASSWORD= the password
DB= the DB 
DIALECT=mysql
SECRET_TOKEN=the secret token u want 
```

## FRONT INFOS 
go in src/services/Api.js
an make sure we have the good Base URL for the API  
```
import axios from 'axios'
import store from '../store/'

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/`,  <---- there 
    headers: {
      'Authorization': `Bearer ${store.state.token}`
    }
  })
}
```
