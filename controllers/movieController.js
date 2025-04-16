const pool = require("../model/db.js");

// Service
const getAllMovies = async () => {
	try {
		const result = await pool.query(`
		SELECT m.*, g.name as genre_name, g.description as genre_description
		FROM movie m
		JOIN genre g ON m.genre_id = g.id
		ORDER BY m.id
	  `);
		return result.rows;
	} catch (err) {
		console.error("Database error in getAllMovies:", err);
		throw err;
	}
};

const getMovieById = async (id) => {
	try {
		const movieId = parseInt(id, 10);
		const result = await pool.query(
			`
		SELECT m.*, g.name as genre_name, g.description as genre_description
		FROM movie m
		JOIN genre g ON m.genre_id = g.id
		WHERE m.id = $1
		`,
			[movieId]
		);
		return result.rows[0];
	} catch (err) {
		console.error(`Database error in getMovieById with id ${id}:`, err);
		throw err;
	}
};

// Controller
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

module.exports = {
	getAllMovies,
	getMovieById,
	getAll,
	getById,
};
