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

	app.get('/api/truck-latest-location', authMiddleware, authorize("admin"), async (req, res) => {

		try {
			const startOfToday = new Date();
			startOfToday.setHours(0, 0, 0, 0);

			const truckLatestLocation = await TruckLocation.aggregate([
				{
					$match: {
						createdAt: { $gte: startOfToday}
					}
				},

				{
					$sort: {
						truckId: 1,
						createdAt: -1
					}
				},

				{
					$group: {
						_id: "$truckId",
						lat: {$first: { $toDouble: "$location.lat"} },
						lng: {$first: { $toDouble: "$location.lng"} },
						createdAt: {$first: "$createdAt"}
					}
				}
			]);

			res.status(200).json(truckLatestLocation);
		} catch (err) {
			return res.status(500).json(err);
		}
	});
}