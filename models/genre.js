const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100},
});

// Virtual for genre's URL
GenreSchema.virtual('url').get(function(){
    return 'http://localhost:3001/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);