const Genre = require("../models/genre");

var path = require('path');

const async = require("async"); 

const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => {
    res.redirect("/catalog/genres");
};  

exports.genre_list = (req, res, next) => {
    Genre.find()
    .exec(function (err, list_genres) {
        if (err) { return next(err); }
        //Successful, so render
        res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3001')
        console.log(list_genres);
        res.send(list_genres);
    });
};


exports.genre_create_post = [
    // Validate and sanitize fields.
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
    
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return next(err);
    } else {

      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name })
        .exec( (err, found_genre) => {
            if (err) {
                return next(err);
            }

            if (found_genre) {
                // Genre exists, redirect to its detail page.
                res.redirect(found_genre.url); 
            } else {
            genre.save((err) => {
                if (err) {
                    return next(err);
                }
                // Genre saved. Redirect to genre detail page.
                // res.redirect(genre.url);
                res.redirect("http://localhost:3001/genres");
            });
        }
      });
    }
  },
];

