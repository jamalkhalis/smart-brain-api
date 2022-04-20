const handleSignin = (db, bcrypt) => (req, res) => {

	const {email, password} = req.body;

	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}

	db.select('*')
		.from('login')
		.where({email})
		.then(log => {
			if (log.length > 0 && email === log[0].email ) {

				bcrypt.compare(password, log[0].hash, function(err, responseHash) {
				    if (responseHash) {
				    	return db.select('*')
				    		.from("users")
				    		.where({email})
				    		.then(user => {
				    			res.json(user[0])
				    		})
				    		.catch(err => res.status(400).json("error loging in"))
				    } else {
				    	res.status(404).json("error loging in")
				    }
				});

			} else {
				res.status(404).json("error loging in")
			}

		})
		.catch(err => res.status(400).json("error loging in"))

}

module.exports = {
	handleSignin: handleSignin
};

// Testing between front-end and back-end

	// if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		
	// 	const { id, name, email, entries, joined } = database.users[0]
	// 	res.json({ id, name, email, entries, joined })

	// } else {
	// 	res.status(400).json("error loging in");
	// }