const express = require("express");
const { getMovies, addMovie, updateMovie } = require("../controllers/movie");

// create express router for movies
const router = express.Router();

// load all the models
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  // original function
  // try {
  //   const genre = req.query.genre;
  //   const rating = req.query.rating;
  //   let movies = [];
  //   if (genre) {
  //     movies = await Movie.find({ genre: genre });
  //   } else if (rating) {
  //     movies = await Movie.find({ rating: { $gt: rating } });
  //   } else {
  //     movies = await Movie.find();
  //   }
  //   res.status(200).send(movies);
  // } catch (error) {
  //   res.status(400).send({
  //     message: error.message,
  //   });
  // }
  // use controller function
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movies = await getMovies(genre, rating);
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //   const movie = await Movie.findOne({ _id: req.params.id });
    const movie = await Movie.findById(req.params.id);
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

/*
  CRUD | REST
  C - Create | POST
  R - Read | GET
  U - update | PUT / PATCH
  D - Delete | DELETE
*/

/* 
  Route for add new movie
  POST http://localhost:5000/movies
  create new movie using the following data:
  - title: Dune Part 2
  - Director: Denis Villeneauve
  - release_year: 2024
  - genre: "Sci-Fi"
  - rating: 9
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newMovie = await addMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );
    // put addMovie function here
    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

/* 
  Route for update movie
  PUT http://localhost:5000/movies/dejnd923jen3e98
*/
router.put("/:id", async (req, res) => {
  try {
    const movie_id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedMovie = await updateMovie(
      movie_id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

/* 
  Route for delete movie
  DELETE http://localhost:5000/movies/dejnd923jen3e98
*/
router.delete("/:id", async (req, res) => {
  try {
    const movie_id = req.params.id;
    await Movie.findByIdAndDelete(movie_id);
    res.status(200).send("Movie has been successfully deleted.");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
// export default router;
