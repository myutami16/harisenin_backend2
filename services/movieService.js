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

const updateMovieById = async (
	id,
	{ title, description, duration, release_date, genre_id, rating }
) => {
	try {
		const movieId = parseInt(id, 10);
		const query = `
		UPDATE movie 
      	SET title = COALESCE($1, title), 
          description = COALESCE($2, description), 
          duration = COALESCE($3, duration), 
          release_date = COALESCE($4, release_date), 
          genre_id = COALESCE($5, genre_id), 
          rating = COALESCE($6, rating)
      	WHERE id = $7
      	RETURNING *
	  	`;
		const values = [
			title,
			description,
			duration,
			release_date,
			genre_id,
			rating,
			movieId,
		];

		const result = await pool.query(query, values);

		if (result.rows.length > 0) {
			return {
				success: true,
				message: "Successfully updated the movie",
				data: result.rows[0],
			};
		} else {
			return {
				success: false,
				message: "Movie not found",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: `Failed to update movie: ${error.message}`,
		};
	}
};

// Service
const deleteMovieById = async (id) => {
	try {
		const movieId = parseInt(id, 10);

		const checkQuery =
			"SELECT * FROM movie WHERE id = $1 AND deleted_date IS NULL";
		const checkResult = await pool.query(checkQuery, [movieId]);

		if (checkResult.rows.length === 0) {
			return {
				success: false,
				message: "Movie not found or already deleted",
			};
		}

		const query =
			"UPDATE movie SET deleted_date = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *";
		const result = await pool.query(query, [movieId]);

		return {
			success: true,
			message: "Successfully deleted the movie",
			data: result.rows[0],
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to delete movie: ${error.message}`,
		};
	}
};

module.exports = {
	getAllMovies,
	getMovieById,
	addMovie,
	updateMovieById,
	deleteMovieById,
};
