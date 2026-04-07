const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@report.kjsepfr.mongodb.net/?appName=report')
.then(() => console.log("MongoDB Connected"));


const reportSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	file: String,
	category: String,
	location: {
		lat: Number,
		lng: Number
	},
	status: {
		type: String,
		enum: ["pending", "resolved"],
		default: "pending"
	}
}, {timestamps: true});

module.exports = mongoose.model('Report', reportSchema);