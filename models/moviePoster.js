const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoviePosterSchema = new Schema({
    title: {type: String, required: true},
    number_in_stock: {type: Number, required: true},
    // image: {type: String, required: true},
    price: {type: Number, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
});

// Virtual for movie's URL
MoviePosterSchema.virtual('url').get(function(){
    return 'http://localhost:3001/catalog/movie-poster/' + this._id;

});

module.exports = mongoose.model('MoviePoster', MoviePosterSchema);