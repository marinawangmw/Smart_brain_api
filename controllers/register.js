const handleRegister =  (db, bcrypt) => (req,res) => {

	const {email, password, name} = req.body;
	
	if(!email || !password || !name){
		return res.status(400).json('Cannot register a blank user')
	}

	const hash = bcrypt.hashSync(password);

	//Creo una transaccion asi ejecuta atomicamente
	db.transaction(trx => {
		trx.insert({
			email: email,
			hash: hash
		}).into('login')
		.returning('*')
		.then(login => {
			return trx('users')
					.insert({
							id:login[0].id,
							name: name,  
							email: login[0].email,
							joined: new Date()
						})
					.returning('*')
					.then(user => res.json(user[0]))
					.catch(console.log)
			})
		.then(trx.commit)
		.catch(trx.rollback)
	})
}

module.exports = { handleRegister }