const handleRegister = (req, res, db, bcrypt) => {

	const { name, email, password } = req.body
	const hash = bcrypt.hashSync(password);

	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
							.returning("*")
							.insert({
								email: loginEmail[0].email,
								name: name,
								joined: new Date()
							})
							.then(user => {
								res.json(user[0]);
							})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))

}

module.exports = {
	handleRegister: handleRegister
};

// Testing between front-end and back-end

	// db("users")
	// 	.returning('*')
	// 	.insert({
	// 		name: name,
	// 		email: email,
	// 		joined: new Date()
	// 	})
	// 	.then(user => {
	// 		res.json(user[0]);
	// 	})
	// 	.catch(err => res.status(400).json("unable to register!"))

	// 	bcrypt.hash(password, null, null, function(err, hash) {
	// 		db("login")
	// 		.returning('*')
	// 		.insert({
	// 			email: email,
	// 			hash: hash
	// 		})
	// 		.then()
	// 		.catch(err => res.status(400).json("unable to register!"))
	// 	});



		// if(login0.email == user0.email){
		// 	res.json(user0)
		// }else {
		// 	console.log("you're not registered")
		// }

		// database.users.push({
		// 		id: "126",
		// 		name: name,
		// 		email: email,
		// 		password: password,
		// 		entries: 0,
		// 		joined: new Date()
		// 	})

	// console.log(database)
	// const { id, entries, joined } = database.users[database.users.length - 1]
	// res.json({ id, name, email, entries, joined })