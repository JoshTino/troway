const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


module.exports = (app) => {
	app.post('/register', async (req, res) => {
		const {name, email, password, confirm} = req.body;


		if (password !== confirm) return res.json({message: "Password mismatch"});

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword
		});

		res.status(201).json(user);
	});
}
