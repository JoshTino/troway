const mongoose = require('mongoose');

const truckLocationSchema = new mongoose.Schema({
	truckId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	location: {
		lat: Number,
		lng: Number
	},
	lga: {
		type: String,
		default: null
	}
}, {timestamps: true});

module.exports = mongoose.model('TruckLocation', truckLocationSchema);