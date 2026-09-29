const { watchList, Movie } = require("../database/relations");

const addToWatchList = async (req, res) => {
  const { MovieId, status, rating, notes } = req.body;

  const movie = await Movie.findOne({
    where: { id: MovieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const existinggWatchlist = await watchList.findOne({
    where: { UserId: req.user.id, MovieId },
  });

  if (existinggWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist" });
  }

  const newWatchList = await watchList.create({
    UserId: req.user.id,
    MovieId,
    status: status || "Planned",
    rating,
    notes,
  });

  return res.status(201).json({
    status: "Success",
    data: { watchList: newWatchList },
  });
};

const getWatchList = async (req, res) => {
  const entries = await watchList.findAll({
    where: { UserId: req.user.id },
    include: [
      {
        model: Movie,
        attributes: ["id", "title", "description", "genre", "year", "image"],
      },
    ],
  });

  return res.status(200).json({
    status: "Success",
    data: { watchList: entries },
  });
};

module.exports = { addToWatchList, getWatchList };
