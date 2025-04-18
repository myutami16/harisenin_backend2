const errorHandler = (err, req, res, next) => {
	console.error(err.stack);

	const statusCode = err.statusCode || 500;

	const errorResponse = {
		success: false,
		message: err.message || "Internal Server Error",
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	};

	res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
