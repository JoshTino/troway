const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"];
	// console.log("Auth header received:", req.headers.authorization);

	if (!token) return res.status(401).json({message: "No token"});

	try {
		const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({message: "Invalid token"});
	}
}

module.exports = authMiddleware;