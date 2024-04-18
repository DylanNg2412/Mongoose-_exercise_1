const express = require("express");

const router = express.Router();

const Show = require("../models/show");

// router.get("/", async (req, res) => {
// get the data out
//   const movies = await Movie.find();
//   res.status(200).send(movies);
// });

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiered_after = req.query.premiere_year;
    let shows = [];
    if (genre) {
      shows = await Show.find({ genre: genre });
    } else if (rating) {
      shows = await Show.find({ rating: { $gt: rating } });
    } else if (premiered_after) {
      shows = await Show.find({ premiere_year: { $gt: premiered_after } });
    } else {
      shows = await Show.find();
    }
    res.status(200).send(shows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    res.status(200).send(show);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
