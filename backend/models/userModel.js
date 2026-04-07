const mongoose = require('mongoose');

/*mongoose.connect('mongodb+srv://test:test@user.gadx4gh.mongodb.net/?appName=user')
.then(() => console.log("MongoDB Connected"));*/


const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: {
		type: String,
		enum: ["user", "moderator", "admin", "super_admin"],
		default: "user"
	}
});

module.exports = mongoose.model('User', userSchema);