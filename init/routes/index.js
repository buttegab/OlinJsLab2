//Serving all the routes that we have.
var Location = require("../models/locationModel"),
User = require('../models/userModel'),
auth = require('../auth'),
http = require('http'),
parseString = require('xml2js').parseString,
request = require('request');


var routes = {}; // technically not necessary because you're globally scoped already, but for consistency...
routes.home = function(req, res){
  res.sendfile('/public/index.html', {root:'./'})
};

routes.login = function(req, res){
  console.log("Logging in.")
  res.sendFile('/public/login.html', {root:'./'})
}


///////////////////////////////////////////
////////// Location API routes ////////////
routes.location = function(req, res){
  // declare variables w/ var; otherwise they'll be scoped to the file instead of this function
  // (which can get messy/cause bugs when different functions use the same variable names)
  // True throughout -- I'll catch the ones I see
  var id = req.query.id;
  Location.findOne({_id:id}, function(err, location){
  	if (err){
  	  res.status(500).send("Error retrieving location by ID")
  	}
  	else {
  	  res.send(location)
  	}
  })
}

routes.searchBook = function(req, res){
  var text = req.query.searchText;
  console.log(text)
  var key = auth.goodreads.APP_ID
  var url = "https://www.goodreads.com/search/index.xml?key="+key+"&q=\""+text+"\""
  request(url, function(err, response, body){
    if (!err && response.statusCode == 200) {
      parseString(body, function(err, result){
        if (err){
          res.status(500).send("Couldn't retrieve book from Goodreads.")
        }
        else{
          // What if there are no responses?
          var book = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0]
          console.log(book)
          var name = book.title[0]
          var author = book.author[0].name[0]
          var image = book.image_url[0]
          res.send({name:name, author:author, image:image})
        }
      })
    }
    else{
      console.log(err)
      res.status(500).send("Couldn't find a book.")
    }
  })
}


routes.locationbyname = function(req, res){
  console.log("Getting location by name")
  var name = req.query.name;
  Location.findOne({name:name}, function(err, location){
    if (err){
      res.status(500).send("Error retrieving location by name")
    }
    else {
      console.log(location)
      res.send(location)
    }
  })
}

routes.addLocation = function(req, res){
  if (!req.body){
  	res.status(400).send("No location provided");
  }
  if (req.body.address && req.body.coordinates){
  	//We aren't supposed to have them cataloged by address or
  	//coordinates
  	req.body.coordinates = null; //TODO: Impliment coordinates by address
  }

  	location = new Location(req.body)
  	location.save(function(err){
  	  if(err){
  	  	res.status(500).send("Location not saved correctly");}
  	  else{

  	  	res.send()
  	  }
  	})

}

routes.editLocation = function(req, res){
  Location.update({_id:req.body.id}, req.body, function(err){
  	if(err){
  	  res.status(500).send("Error updating location.")
  	}
  	else{
  	  res.send()
  	}
  })
}

routes.deleteLocation = function(req, res){
  Location.remove({_id:req.body.id}, function(err){
  	if(err){
  	  res.status(500).send("Error deleting location.")
  	}
  	else{
  	  res.send()
  	}
  })
}


module.exports = routes;
