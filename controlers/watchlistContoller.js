const express = require("express");
const { watchList, Movie } = require("../database/relations");

const addToWatchList = async (req, res) => {
  const { MovieId, status, rating, notes } = req.body;

  // Verify movie exists
const movie = await Movie.findOne({
  where: { id: MovieId },
});

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  //check if already added
  const existinggWatchlist = await watchList.findOne({
    where: {
      UserId: req.user.id,
      MovieId
    },
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


    
    res.status(201).json({
        status: "Success",
        data: {
            watchList: newWatchList,
        },
    })

}

module.exports = addToWatchList;