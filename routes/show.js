const express = require("express");
const { getShows, addShow, updateShow } = require("../controllers/show");

const router = express.Router();

const Show = require("../models/show");

// router.get("/", async (req, res) => {
// get the data out
//   const movies = await Movie.find();
//   res.status(200).send(movies);
// });

router.get("/", async (req, res) => {
  // try {
  //   const genre = req.query.genre;
  //   const rating = req.query.rating;
  //   const premiere_year = req.query.premiere_year;
  //   let shows = [];
  //   if (genre) {
  //     shows = await Show.find({ genre: genre });
  //   } else if (rating) {
  //     shows = await Show.find({ rating: { $gt: rating } });
  //   } else if (premiere_year) {
  //     shows = await Show.find({ premiere_year: { $gt: premiere_year } });
  //   } else {
  //     shows = await Show.find();
  //   }
  //   res.status(200).send(shows);
  // } catch (error) {
  //   res.status(400).send({
  //     message: error.message,
  //   });
  // }
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    const shows = await getShows(genre, rating, premiere_year);
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

// add
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newShow = await addShow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(newShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const show_id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedShow = await updateShow(
      show_id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(updatedShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const show_id = req.params.id;
    await Show.findByIdAndDelete(show_id);
    res.status(200).send("Show has been successfully deleted");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});
module.exports = router;
