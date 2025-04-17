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

const addMovie = async ({
	title,
	description,
	duration,
	release_date,
	genre_id,
	rating,
}) => {
	try {
		const query =
			"INSERT INTO movie (title, description, duration, release_date, genre_id, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
		const values = [
			title,
			description,
			duration,
			release_date,
			genre_id,
			rating,
		];

		const result = await pool.query(query, values);

		if (result.rows.length > 0) {
			return {
				success: true,
				message: "Successfully added the movie to the database",
				data: result.rows[0],
			};
		}
	} catch (error) {
		return {
			success: false,
			message: `Failed to add movie: ${error.message}`,
		};
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

module.exports = {
	getAllMovies,
	getMovieById,
	addMovie,
	getAll,
	getById,
	postMovie,
};
