const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs")
var cors = require('cors')

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'jamal',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send("it's working!!")
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})  
// this is what we call dependency injection we're injecting whatever dependencies then handle register function meet

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port 3000 ${process.env.PORT}`);
})


// Testing between front-end and back-end

		// db.select('*').from('users').then(data => {
		// 	console.log(data);
		// });


		// const database = {
		// 	users: [
		// 		{
		// 			id: "123",
		// 			name: "John",
		// 			email: "john@gmail.com",
		// 			password: 'cookies',
		// 			entries: 0,
		// 			joined: new Date()
		// 		},
		// 		{
		// 			id: "124",
		// 			name: "Sally",
		// 			email: "sally@gmail.com",
		// 			password: 'banans',
		// 			entries: 0,
		// 			joined: new Date()
		// 		}
		// 	]
		// }

		/*

		/ --> res = this is working
		/ signin --> POST = success/fail
		/ register --> POST = user
		/ profile/:userId --> GET = user
		/ image --> PUT --> user

		*/