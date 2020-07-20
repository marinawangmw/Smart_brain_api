const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '97c57c4754724f5a886f91850cf1496f'
});

const handleApiCall = (req, res) => {
	app.models
	    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	    .then(response => res.json(response))
	    .catch(err => res.status(400).json('Unable to work with api'))
}

const handleImage = (db) => (req,res) => {
	const {id} = req.body;

	db('users')
		.returning('submissions')
	  .where({id:id})
	  .increment('submissions',1)
	  .then(count => res.json(count[0]))
	  .catch(err => res.status(400).json('Unable to find the user'))
}

module.exports = { handleImage, handleApiCall }