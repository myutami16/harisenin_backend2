const express = require("express");
const app = express();
const {
	getAll,
	getById,
	postMovie,
	updateMovie,
	deleteMovie,
} = require("./controllers/movieController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/movies", getAll);
app.get("/movie/:id", getById);
app.post("/movie", postMovie);
app.patch("/movie/:id", updateMovie);
app.delete("/movie/:id", deleteMovie);

module.exports = app;
