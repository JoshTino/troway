const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

	app.post('/login', async (req, res) => {
		const {email, password} = req.body;

		const user = await User.findOne({ email });

		if (!user) return res.status(404).json({message: "User not found"});

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(400).json({message: "Invalid login credentials"});

		const token = jwt.sign(
			{id: user._id, role: user.role},
			process.env.JWT_SECRET,
			{expiresIn: "1d"}
		);

		res.status(200).json({token});
	});

}