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

	//This endpoint retrieves all reporters from database
	app.get('/api/all-reporters', authMiddleware, authorize("super_admin"), async (req, res) => {
		try {
			const users = await User.find({role: "user"});

			if (users) return res.status(200).json(users);

			return res.status(404).json({message: "No userr"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.post('/api/add-admin', authMiddleware, authorize("super_admin"), async (req, res) => {

		const {name, email, lga} = req.body;
		const defaultPassword = await bcrypt.hash("1234", 10);


		try {
			
			const superAdmin = await User.findById(req.user.id);

			const newAdmin = await User.create({
				addedBy: req.user.id,
				name: name,
				email: email,
				password: defaultPassword,
				lga: lga,
				role: "admin"
			});

			if (newAdmin) return res.status(201).json(newAdmin);

		} catch (err) {
			return res.status(500).json(err);
		}

	});

	app.get('/api/super-admin-profile-data', authMiddleware, authorize("super_admin"), async (req, res) => {


		try {

		const admin = await User.findById(req.user.id);	

		if (admin) return res.status(200).json(admin);

		return res.status(404).json({message: "Admin not found"});

		} catch (err) {
			return res.status(500).json(err);
		}

	});

}