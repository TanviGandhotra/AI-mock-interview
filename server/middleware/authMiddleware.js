const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const authorization = req.headers.authorization || "";
	const [scheme, token] = authorization.split(" ");

	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({
			success: false,
			message: "Authentication is required.",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded.id) throw new Error("Invalid token");
		req.user = { id: decoded.id };
		return next();
	} catch {
		return res.status(401).json({
			success: false,
			message: "Your session is invalid or expired. Please sign in again.",
		});
	}
};

module.exports = authenticateToken;
