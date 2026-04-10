const mongoose = require("mongoose");

const seedUsers = require('./seeders/userSeeder');

const seed = async () => {
	try {
		await mongoose.connect("mongodb+srv://test:test@report.kjsepfr.mongodb.net/?appName=report");
		console.log("Connected to DB");

		const user = await seedUsers(20);
		console.log("Seeding complete");

		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

seed();