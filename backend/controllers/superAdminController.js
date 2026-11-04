const User = require('../models/userModel');
const Report = require('../models/reportModel');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

	//This endpoint retrieve all moderators  from the database
	app.get('/api/all-moderators', authMiddleware, authorize("super_admin"), async (req, res) => {
		try {
			const moderators = await User.find({role: "moderator"});

			if (moderators) return res.status(200).json(moderators);

			return res.status(404).json({message: "No moderator"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});



}