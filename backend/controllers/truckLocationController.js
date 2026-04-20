const TruckLocation = require('../models/truckLocationModel');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

module.exports = (app) => {
	app.post('/api/truck-location', authMiddleware, authorize("admin", "moderator"), async (req, res) => {
			const {lat, lng} = req.body;
			const truckId = req.user.id;

		try {

			if (lat == null || lng == null) {
				return res.status(400).json({error: "Missing data"});
			}

			console.log(truckId);

			const truckLocation = await TruckLocation.create({
				truckId,
				location: {
					lat,
					lng
				}
			});

			return res.status(201).json(truckLocation);
		} catch (err) {
			return res.status(500).json(err);
		}

	});
}