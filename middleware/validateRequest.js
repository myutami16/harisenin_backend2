const validateRequestBody = (req, res, next) => {
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).json({
			success: false,
			message: "Request body cannot be empty",
		});
	}

	next();
};

const validateFields = (requiredFields) => {
	return (req, res, next) => {
		const missingFields = [];

		requiredFields.forEach((field) => {
			if (!req.body[field]) {
				missingFields.push(field);
			}
		});

		if (missingFields.length > 0) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
				details: `The following fields are required: ${missingFields.join(
					", "
				)}`,
			});
		}

		next();
	};
};

module.exports = {
	validateRequestBody,
	validateFields,
};
