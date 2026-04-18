const User = require('../models/userModel');
const Report = require('../models/reportModel');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');



module.exports = (app) => {

	app.get('/get_moderators', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const moderators = await User.find({role: "moderator"});

			if (moderators) return res.status(200).json(moderators);

			return res.status(404).json({message: "No moderator"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.get('/get_users', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const users = await User.find({role: "user"});

			if (users) return res.status(200).json(users);

			return res.status(404).json({message: "No userr"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.patch('/make_moderator/:id', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const userId = req.params.id;

			const makeModerator = await User.findByIdAndUpdate(userId, {role: "moderator"});

			if (makeModerator) return res.status(200).json(makeModerator);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});


	app.delete('/remove_user/:id', authMiddleware, authorize("admin"), async (req, res) => {
		try {
			const userId = req.params.id;

			const removeUser = await User.findByIdAndDelete(userId);

			if (removeUser) return res.status(200).json(removeUser);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});


	app.patch('/remove_moderator/:id', authMiddleware, authorize("admin"), async (req, res) => {
		const userId = req.params.id;

		try {
			const removeModerator = await User.findByIdAndUpdate(userId, {role: "user"});

			if (removeModerator) return res.status(200).json(removeModerator);

			return res.status(404).json({message: "Not Found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.patch('/assign_task/:moderatorId/:reportId', authMiddleware, authorize("admin"), async (req, res) => {
		const {moderatorId, reportId} = req.params;
		try {
			const assignTask = await Report.findOneAndUpdate({reportId}, { $set: {assignedTo: moderatorId, status: "assigned"}}, {returnDocument: "after"});

			if (assignTask) return res.status(200).json(assignTask);

			return res.status(204).status({message: "No Content"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

}
