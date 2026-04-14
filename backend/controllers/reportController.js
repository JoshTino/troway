const multer = require('multer');
const Report = require('../models/reportModel');
const authMiddleware = require('../middleware/authMiddleware');

/*const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@report.kjsepfr.mongodb.net/?appName=report')
.then(() => console.log("MongoDB Connected"));

const reportSchema = new mongoose.Schema({
	file: String,
	category: String,
	location: {
		lat: Number,
		lng: Number
	}
});

const Report = mongoose.model('Report', reportSchema);*/

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},

	filename: (req, file, cb) => {
		cb(null, Date.now()+ "-" + file.originalname);
	}
});

const upload = multer({
	storage,
	limits: {filesize: 2 * 1023 * 1024},
	filter: (req, file, cb) => {
		if (file.mimetype === 'image/') {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed"), false);
		}
	}
});

module.exports = (app) => {

	app.get('/get_report', authMiddleware, async (req, res) => {
		try {
			const userId = req.user.id;
			const report = await Report.find({user: userId});
			res.status(200).json(report);
		} catch (err) {
			res.status(500).json(err);
		}
	});

	app.get('/get_report_edit/:id', async (req, res) => {
		const reportId = req.params.id;

		try {
			const report = await Report.findOne({_id: reportId});

			// If the database query is "true" (report exists) 
			if (report) {
				return res.status(200).json(report);
			}

			// If database query return null (not found)
			res.status(404).json({message: "Report not found"});
		} catch (err) {
			// Handles invalid IDs or database connection issue
			res.status(500).json(err.message);
		}
	});

	app.patch('/edit_report/:id', authMiddleware, async (req, res) => {
		const reportId = req.params.id;
		const {category} = req.body;

		try {
			const editReport = await Report.findByIdAndUpdate(reportId, {category: category});
			// await editReport.updateOne({category: category});

			if (editReport) return res.status(200).json(editReport);

			res.status(404).json({message: "Report no found"});
		} catch (err) {
			res.status(500).json(err.message)
		}
	});

	app.delete('/delete_report/:id', authMiddleware, async (req, res) => {
		const reportId = req.params.id;


		try {
			const deleteReport = await Report.findByIdAndDelete({_id: reportId});

			/*if (deleteReport.user.toString() !== req.user.id) {
				return res.status(403).json({ message: "Unauthorized" });
			}*/
			
			if (deleteReport) return res.status(200).json({message: "Report deleted"});

			res.status(400).json({message: "Report not found"});
		} catch (err) {
			res.status(500).json(err.message);
		}
	});

	app.post('/submit_report', authMiddleware, upload.single('file'), async (req, res) => {

		const {category, lat, lng} = req.body;
		const file = req.file.filename;
		const userId = req.user.id;

		const data = {
			user: userId,
			file,
			category,
			location: {
				lat,
				lng
			}
		}

		try {
			const newReport = new Report(data);
			await newReport.save();
			await res.json({message: "Request has been submitted", data: newReport});
		} catch (err) {
			res.status(400).json(err);
		}
	});


	app.get('/get_all_waste_location', authMiddleware, async (req, res) => {

		try {
			const getAllWasteLocation = await Report.find();

			if (getAllWasteLocation) return res.status(200).json(getAllWasteLocation);

			res.status(404).json({message: "Reports not found"});
		} catch (err) {
			res.status(500).json(err.message);
		}
	});

}