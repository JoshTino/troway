const User = require('../models/userModel');
const Report = require('../models/reportModel');
const authMiddleware = require('../middleware/authMiddleware');



module.exports = (app) => {
	app.get("/get_moderator_task", authMiddleware, async (req, res) => {
		const userId =  req.user.id;

		console.log(userId);

		try {
			const moderatorTask = await Report.find({assignedTo: userId, status: "pending"});

			if (moderatorTask) return res.status(200).json(moderatorTask);

			return res.status(404).json({message: "Report not found"})
		} catch (err) {
			return res.status(500).json(err);
		}
	});
}