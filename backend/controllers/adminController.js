const User = require('../models/userModel');
const Report = require('../models/reportModel');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const bcrypt = require('bcryptjs');



module.exports = (app) => {

	app.get('/api/moderators', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const moderators = await User.find({role: "moderator"});

			if (moderators) return res.status(200).json(moderators);

			return res.status(404).json({message: "No moderator"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.get('/api/lga-moderators', authMiddleware, authorize("admin"), async (req, res) => {


		try {

			const admin = await User.findById(req.user.id);

			const moderators = await User.find({role: "moderator", lga: admin.lga});

			if (moderators) return res.status(200).json(moderators);

			return res.status(404).json({message: "No moderator"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.get('/api/users', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const users = await User.find({role: "user"});

			if (users) return res.status(200).json(users);

			return res.status(404).json({message: "No userr"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.patch('/api/moderator/:id', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const userId = req.params.id;

			const makeModerator = await User.findByIdAndUpdate(userId, {role: "moderator"});

			if (makeModerator) return res.status(200).json(makeModerator);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});


	app.delete('/api/user/:id', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const userId = req.params.id;

			const removeUser = await User.findByIdAndDelete(userId);

			if (removeUser) return res.status(200).json(removeUser);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});


	app.patch('/api/remove-moderator/:id', authMiddleware, authorize("admin"), async (req, res) => {
		const userId = req.params.id;

		try {
			const removeModerator = await User.findByIdAndUpdate(userId, {role: "user"});

			if (removeModerator) return res.status(200).json(removeModerator);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.patch('/api/assign-task/:moderatorId/:reportId', authMiddleware, authorize("admin"), async (req, res) => {
		const {moderatorId, reportId} = req.params;

		try {
			const assignTask = await Report.findOneAndUpdate(
				{_id: reportId},
				{ $set: {assignedTo: moderatorId, status: "assigned"} },
				{returnDocument: "after"});

			if (assignTask) return res.status(200).json(assignTask);

			return res.status(204).json({message: "No Content"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.post('/api/add-admin', authMiddleware, authorize("admin"), async (req, res) => {

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

	app.get('/api/admin-profile-data', authMiddleware, async (req, res) => {


		try {

		const admin = await User.findById(req.user.id);	

		if (admin) return res.status(200).json(admin);

		return res.status(404).json({message: "Admin not found"});

		} catch (err) {
			return res.status(500).json(err);
		}

	});

}
