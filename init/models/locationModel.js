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
    address: String, //Geocoding API accepts "5-box input", a json object
    coordinates: String, //Two different floats -- wait, it's two floats but it's typed as a string?
    bookshelf: String, //Array of books to list -- wait, it's an array but it's typed as a string?
    description: String
});

module.exports  = mongoose.model('location', locationSchema);
