const express = require("express");
const app = express();
const { getAll, getById } = require("./controllers/movieController");

app.use(express.json());

// Routes
app.get("/movies", getAll);
app.get("/movie/:id", getById);

module.exports = app;
