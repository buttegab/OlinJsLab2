//Serving all the routes that we have.
var Location = require("../models/locationModel")
User = require('./models/userModel')

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