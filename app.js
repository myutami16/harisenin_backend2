const express = require("express");
const app = express();
const {
	getAll,
	getById,
	postMovie,
	updateMovie,
	deleteMovie,
} = require("./controllers/movieController");
const errorHandler = require("./middleware/errorHandler");
const {
	validateRequestBody,
	validateFields,
} = require("./middleware/validateRequest");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/movies", getAll);
app.get("/movie/:id", getById);
app.post(
	"/movie",
	validateRequestBody,
	validateFields([
		"title",
		"description",
		"duration",
		"release_date",
		"genre_id",
		"rating",
	]),
	postMovie
);
app.patch("/movie/:id", validateRequestBody, updateMovie);
app.delete("/movie/:id", deleteMovie);

app.use(errorHandler);
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Resource not found",
	});
});

module.exports = app;
