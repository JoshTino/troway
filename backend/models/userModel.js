const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	addedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null
	},
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
		default: null
	}
});

module.exports = mongoose.model('User', userSchema);