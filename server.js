const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();

app.use(express.json());
app.use(cors());

//Conexion a la BD
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1229',
    database : 'smart_brain'
  }
});



/*========================
		PROTOCOLOS HTTP
========================*/

app.get('/',(req,res) => { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`app is running on port ${PORT}`); });




//==========================================================
/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = usr	
/profile/:id --> GET = usr --> y lo llamo como 'localhost:3000/profile/123'
/image --> PUT = usr (update ranking)
*/