//Serving all the routes that we have.
var Location = require("../models/locationModel"),
User = require('../models/userModel'),
auth = require('../auth'),
http = require('http'),
request = require('request');

routes = {}
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
  id = req.query.id;
  Location.findOne({_id:id}, function(err, location){
  	if (err){
  	  res.status(500).send("Error retrieving location by ID")
  	}
  	else {
  	  res.send(location)
  	}
  })
}

// routes.searchBook = function(req, res){
//   text = req.searchText;
//   var bodyChunks = [];
//   var data = "/search/index.xml?key=IiXhpeA7SZ5r0z4ndE2BEg&q=Redshirts"
//   http.get({host:"https://www.goodreads.com/search/index.xml?key=IiXhpeA7SZ5r0z4ndE2BEg&q=Redshirts"})
//     .on('data', function(chunk) {
//       // You can process streamed parts here...
//       bodyChunks.push(chunk);
//     })
//     .on('end', function(){
//       console.log(Buffer.concat(bodyChunks).results[0])
//       res.send(Buffer.concat(bodyChunks))
//     })
//     .on('error', function (err){
//       console.log(err)
//       res.status(500).send("Error looking up book.")
//     })
// }

routes.searchBook = function(req, res){
  text = req.searchText;
  var bodyChunks = [];
  var url = "https://www.goodreads.com/search/index.xml?key=IiXhpeA7SZ5r0z4ndE2BEg&q=Redshirts"
  request(url, function(err, response, body){
    if (!err && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage. 
      res.send(body)
    }
    else{
      console.log(err)
      res.send("Couldn't get it.")
    }
  })
}


routes.locationbyname = function(req, res){
  console.log("Getting location by name")
  name = req.query.name;
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