const handleProfile = (db) => (req,res) => {
	const {id} = req.params;
	db('users').where({id: id}).select('*')
	.then(user => {
		if(user.length){
			res.json(user[0])
		} else {
			res.status(400).json('Not found')
		} 	
	})
	.catch(err => res.status(400).json('error'))
}

module.exports = { handleProfile }