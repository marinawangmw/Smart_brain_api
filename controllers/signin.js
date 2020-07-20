const handleSignin = (db, bcrypt) => (req,res) => {
	// Load hash from your password DB.
	const { email, password } = req.body;

	if(!email || !password){
		return res.status(400).json('Invalid credentials')
	}
	
	db('login').where({email: email}).select('*')
	.then(login => {
		if(login.length){

			const isValid = bcrypt.compareSync(password,login[0].hash)
		
			if(isValid){
		  	db('users').where({email: email}).select('*')
				.then(user => {res.json(user[0])})
			} else{res.status(400).json('Wrong credentials')}
		} else{res.status(400).json('Invalid user')}
	})
}
module.exports = { handleSignin }