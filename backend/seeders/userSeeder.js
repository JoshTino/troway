const { faker } = require("@faker-js/faker");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


const seedUsers = async (count = 20) => {
	const users = [];

	for (let i = 0; i < count; i++) {
		const hashedPassword = await bcrypt.hash("1234", 10);

		users.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: hashedPassword,
			role: faker.helpers.arrayElement(["user", "moderator", "admin", "super_admin"])
		});

	}
		const createdUsers = await User.insertMany(users);

		console.log(`${createdUsers.length} users inserted`);

		return createdUsers;
}

module.exports = seedUsers;