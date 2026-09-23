const express = require("express");
const { watchList, Movie } = require("../database/relations");

const addToWatchList = async (req, res) => {
  const { MovieId, status, rating, notes } = req.body;

  // Verify movie exists
  const movie = await Movie.findUnique({
    where: { id: MovieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  //check if already added
  const existinggWatchlist = await watchList.findUnique({
    where: {
      UserId: MovieId,
      UserId: UserId,
      MovieId: MovieId,
    },
  });
    
     if (existinggWatchlist) {
       return res.status(40).json({ error: "Movie already in the watchlist" });
    }
    
    const watchList = await watchList.create({
      data: {
        UserId,
        MovieId,
        status: status || "Planed",
        rating,
        notes,
      },
    });
    
    res.status(201).json({
        status: "Success",
        data: {
            watchList,
        },
    })

}