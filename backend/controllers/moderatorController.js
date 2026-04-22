const User = require('../models/userModel');
const Report = require('../models/reportModel');
const multer = require('../multer/multer');
const authMiddleware = require('../middleware/authMiddleware');



module.exports = (app) => {
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
}