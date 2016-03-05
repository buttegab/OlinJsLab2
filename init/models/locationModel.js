/* Schema for each wiki page
 * name: Location name
 * address: Address of the location
 * bookshelf: books suggested for the location
 * description: Description of the location
 */

var mongoose = require('mongoose');

// Create a wiki page schema
var locationSchema = mongoose.Schema({
    name: String,
    address: Object, //Geocoding API accepts "5-box input", a json object
    coordinates: Array, //Two different floats
    bookshelf: Array, //Array of books to list
    description: String
});

module.exports  = mongoose.model('location', locationSchema);