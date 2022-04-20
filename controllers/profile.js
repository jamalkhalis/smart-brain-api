const handleProfile = (req, res, db) => {

	const {id} = req.params;

	db.select('*')
		.from('users')
		.where({ id })
		.then(user => {
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(404).json("Not Found")
			}
			
		})
		.catch(err => res.status(404).json("error"))

}

module.exports = {
	handleProfile: handleProfile
}

// Testing between front-end and back-end

	// let found = false;

	// database.users.forEach((item) => {

	// 	if ( item.id === id ) {
	// 		found = true;
	// 		res.json(item);
	// 	}

	// })

	// if (!found) {
	// 	res.status(404).json("user not found");
	// }

	// console.log(id);