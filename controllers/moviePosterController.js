const MoviePoster = require("../models/moviePoster");

var path = require('path');
const async = require("async"); 

const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => {
    res.redirect("/catalog/movie-posters");
};  

exports.poster_list = (req, res, next) => {
    MoviePoster.find()
    .populate("genre")
    .exec(function (err, list_movie_posters) {
        if (err) { return next(err); }
        //Successful, so render
        res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3001')
        // console.log(list_movie_posters);
        res.json(list_movie_posters);
    });
}

exports.poster_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
      if (!Array.isArray(req.body.genre)) {
        req.body.genre =
          typeof req.body.genre === "undefined" ? [] : [req.body.genre];
      }
      next();
    },
  
    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("number_in_stock", "Number in stock must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("price", "Price must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("genre.*").escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      console.log(req.body.genre);
  
      // Create a Poster object with escaped and trimmed data.
      const moviePoster = new MoviePoster({
        title: req.body.title,
        number_in_stock: req.body.number_in_stock,
        price: req.body.price,
        genre: req.body.genre,
      });
      console.log(moviePoster.genre);
      
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        return next(err);
      }
  
      // Data from form is valid. Save poster.
      moviePoster.save((err) => {
        if (err) {

          return next(err);
        }
        // Successful: redirect to new poster record.
        // res.redirect(moviePoster.url);
        res.redirect("http://localhost:3001/movie-posters");

        
      });
    },
  ];