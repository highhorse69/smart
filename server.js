const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db=knex({
    //connect database
  client: 'pg',

  connection: {
     connectionString:process.env.DATABASE_URL,
     ssl: {
    rejectUnauthorized: false
  }

}
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.listen(process.env.PORT || 8080,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});
