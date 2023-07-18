const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => next(err));
});

router.post("/create", (req, res, next) => {
  let { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((result) => {
      res.redirect("/movies/movies");
    })
    .catch((err) => next(err));
});


router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const movieId = req.params.id;
  
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => next(err));
});

router.post("/:id/delete", (req, res, next) => {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies/movies");
    })
    .catch((err) => next(err));
});


    router.get("/:id/edit", (req, res, next) => {    
      Movie.findById(req.params.id)
        .then((movie) => {
          Celebrity.find()
            .then((celebrities) => {
              res.render("movies/edit-movie", { movie, celebrities });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    });

    router.post("/:id/edit", (req, res, next) => {
      let { title, genre, plot, cast }  = req.body;
      Movie.findByIdAndUpdate(
        req.params.id,
        { title, genre, plot, cast },
        { new: true }
      )
        .then((result) => {
          res.redirect("/movies/movies");
        })
        .catch((err) => next(err));
    }); 

module.exports = router;


