var app = angular.module("bookQuestApp", ['ngRoute']);
//Handles all the angular controllers and data acquiring from the routes.

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.currentSkwiki = null;

    // when landing on the page, get all skwiki titles and show them
    $http.get("/")
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    //adds a location
    $scope.searchLocation = function(location) {
                console.log(location);
                //takes in coordinates and changes the map location to that
            
                $('#map').replaceWith('<div id="map" style="width:500px; height:300px;"></div>')
                console.log('passed')
                var res = location.split(" ");
                var lati = parseFloat(res[0])
                var lon = parseFloat(res[1])
                console.log(lati)
                // create an object for options
                var options = {
                elt: document.getElementById('map'),       // ID of map element on page
                zoom: 10,                                  // initial zoom level of the map
                latLng: { lat: lati, lng: lon },  // center of map in latitude/longitude
                mtype: 'map',                              // map type (map, sat, hyb); defaults to map
                bestFitMargin: 0,                          // margin offset from map viewport when applying a bestfit on shapes
                zoomOnDoubleClick: true                    // enable map to be zoomed in when double-clicking
                };
             
                // construct an instance of MQA.TileMap with the options object
                mapthing = new MQA.TileMap(options);
                dothing()
        ;

  // download the modules
        function dothing() { 
            MQA.withModule('largezoom', function() {
    // add the Large Zoom control
                mapthing.addControl(new MQA.LargeZoom());
                

                window.map = mapthing;
        });}

    }

    $scope.createLocation = function() {
        console.log($scope.address);
        cord = $scope.coordinates;
        namer = $scope.name;
        book = $scope.bookshelf;
        $http.post("/addLocation", {name: $scope.name, address: $scope.address, coordinates: $scope.coordinates, bookshelf: $scope.bookshelf, description: $scope.description})
            .success(function(data) {

                $('#map').replaceWith('<div id="map" style="width:500px; height:300px;"></div>')
                console.log('passed')
                var res = $scope.coordinates.split(" ");
                var lati = parseFloat(res[0])
                var lon = parseFloat(res[1])
                console.log(lati)
                // create an object for options
                var options = {
                elt: document.getElementById('map'),       // ID of map element on page
                zoom: 10,                                  // initial zoom level of the map
                latLng: { lat: lati, lng: lon },  // center of map in latitude/longitude
                mtype: 'map',                              // map type (map, sat, hyb); defaults to map
                bestFitMargin: 0,                          // margin offset from map viewport when applying a bestfit on shapes
                zoomOnDoubleClick: true                    // enable map to be zoomed in when double-clicking
                };
             
                // construct an instance of MQA.TileMap with the options object
                mapthing = new MQA.TileMap(options);
                dothingy();

  // download the modules
        function dothingy() { 
            MQA.withModule('largezoom', function() {
    // add the Large Zoom control
                mapthing.addControl(new MQA.LargeZoom());
                
                var res = cord.split(" ");
                var lati = parseFloat(res[0])
                var lon = parseFloat(res[1])
                console.log(lati);
                console.log(lon);
                // create a POI by passing in a lat/lng object to the MQA.Poi constructor
                var info = new MQA.Poi({ lat: lati, lng: lon });
                   
                // set the rollover content for the POI
                info.setRolloverContent(namer);
                   
                // set the InfoWindow contents for the POI
                //  - by default, the HTML content will be displayed when the POI receives a mouseclick event
                info.setInfoContentHTML(book);
                   
                // add POI to the map's default shape collection
                mapthing.addShape(info);

                window.map = mapthing;
        });}
                
                


                $scope.name = null; // clear the form
                $scope.address = null;
                $scope.coordinates = null;
                $scope.bookshelf = null;
                $scope.description = null;

                $scope.skwikis = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
