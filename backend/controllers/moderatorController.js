const User = require('../models/userModel');
const Report = require('../models/reportModel');
const multer = require('../multer/multer');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');



module.exports = (app) => {

	app.get('/api/moderator', authMiddleware, async (req, res) => {

		try {
			const moderatorDetails = await User.findById(req.user.id);

			if (makeModerator) return res.status(201).json(moderatorDetails);
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.get('/api/moderator-task', authMiddleware, async (req, res) => {
		const moderatorId =  req.user.id;

		try {
			const moderatorTask = await Report.find({assignedTo: moderatorId, status: "assigned"});

			if (moderatorTask) return res.status(200).json(moderatorTask);

			return res.status(404).json({message: "Report not found"})
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.post('/api/mark-completed-task/:id', authMiddleware, multer.upload.single("file"), async (req, res) => {

		const reportId = req.params.id;
		const moderatorId = req.user.id;
		const file = req.file.filename;

		try {
			const taskCompleted = await Report.findOneAndUpdate(
				{_id: reportId}, 
				{ $set: {status: "cleared", completedBy: moderatorId, photoEvidence: file} },
				{returnDocument: "after"} );

			if (taskCompleted) return res.status(200).json(taskCompleted);

			return res.status(404).json({message: "Report not found"});
		} catch (err) {
			return res.status(500).json(err);
		}
	});

	app.post('/api/add-reporter/', authMiddleware, async (req, res) => {
		const {name, email} = req.body;
		const moderatorId = req.user.id;
		const defaultPassword = await bcrypt.hash("1234", 10);

		const moderator = await User.findById(req.user.id);

		try {

			const addReporter = await User.create({
				addedBy: moderatorId,
				name,
				email,
				password: defaultPassword,
				state: moderator.state,
				lga: moderator.lga
			});

			if (addReporter) return res.status(201).json(addReporter);

		} catch (err) {
			return res.status(500).json(err);
		}


	});
}