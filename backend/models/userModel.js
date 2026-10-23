const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: {
		type: String,
		enum: ["user", "moderator", "admin", "super_admin"],
		default: "user"
	},
	state: {
		type: String,
		default: "nil"
	}
});

module.exports = mongoose.model('User', userSchema);