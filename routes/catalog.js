const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

// Require controller modules.
const movie_poster_controller = require("../controllers/moviePosterController");
const genre_controller = require("../controllers/genreController");


router.get("/", movie_poster_controller.index); 
router.get("/movie-posters", movie_poster_controller.poster_list); 
router.post("/movie-poster/create", movie_poster_controller.poster_create_post); 

router.get("/genres", genre_controller.genre_list); 
router.post("/genre/create", genre_controller.genre_create_post); 


module.exports = router;