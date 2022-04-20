const handleImage = (req, res, db) => {

	const {id} = req.body

	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		})
		.catch(err =>{
			res.status(400).json("unable to get entries")
		})

}

module.exports = {
	handleImage: handleImage
}

// Testing between front-end and back-end

	// let found = false;

	// database.users.forEach((item) => {
	// 	if (item.id === id) {
	// 		item.entries++;
	// 		found = true;
	// 		res.json(item.entries);
	// 	}
	// })

	// if (!found) {
	// 	res.status(400).json("user not found")
	// }