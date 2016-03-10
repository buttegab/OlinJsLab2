/* Schema for each user
 * name: Location name
 * address: Address of the location
 * bookshelf: books suggested for the location
 * description: Description of the location
 */

var mongoose = require('mongoose');

// Create a wiki page schema
var userSchema = mongoose.Schema({
    goodreadsID: String,
    locations: Array
});

module.exports  = mongoose.model('user', userSchema);