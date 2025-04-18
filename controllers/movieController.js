const pool = require("../model/db.js");
const {
	getAllMovies,
	getMovieById,
	addMovie,
	updateMovieById,
	deleteMovieById,
} = require("../services/movieService");

const getAll = async (req, res) => {
	try {
		const movies = await getAllMovies();
		res.json(movies);
	} catch (err) {
		res.status(500).json({ error: "Failed to retrieve movies data" });
	}
};

const getById = async (req, res) => {
	try {
		const movie = await getMovieById(req.params.id);
		if (!movie) return res.status(404).json({ error: "Movie not found" });
		res.json(movie);
	} catch (err) {
		res.status(500).json({ error: "Failed to retrieve the movie" });
	}
};

const postMovie = async (req, res) => {
	try {
		const { title, description, duration, release_date, genre_id, rating } =
			req.body;

		if (!title || !description || !duration || !release_date || !genre_id) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const result = await addMovie({
			title,
			description,
			duration,
			release_date,
			genre_id,
			rating,
		});

		if (result.success) {
			return res.status(201).json(result);
		} else {
			return res.status(500).json(result);
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Server error: ${err.message}`,
		});
	}
};

const updateMovie = async (req, res) => {
	try {
		const { title, description, duration, release_date, genre_id, rating } =
			req.body;

		if (
			!title &&
			!description &&
			!duration &&
			!release_date &&
			!genre_id &&
			!rating
		) {
			return res.status(400).json({
				success: false,
				message: "No fields provided for update",
			});
		}

		const result = await updateMovieById(req.params.id, {
			title,
			description,
			duration,
			release_date,
			genre_id,
			rating,
		});

		if (result.success) {
			return res.status(200).json(result);
		} else {
			return res
				.status(result.message === "Movie not found" ? 404 : 500)
				.json(result);
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Server error: ${err.message}`,
		});
	}
};

const deleteMovie = async (req, res) => {
	try {
		const result = await deleteMovieById(req.params.id);
		if (result.success) {
			return res.status(200).json(result);
		} else {
			return res
				.status(result.message.includes("not found") ? 404 : 500)
				.json(result);
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Server error: ${err.message}`,
		});
	}
};

module.exports = {
	getAll,
	getById,
	postMovie,
	updateMovie,
	deleteMovie,
};
