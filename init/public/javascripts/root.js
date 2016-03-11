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
    $scope.searchLocation = function(searchlocation) {
        $.get("/searchLocation", {name:searchlocation})
            .done(function(data, status){
                if (typeof(data) === "object"){
                    console.log("Making map from name")
                    $scope.createMapLocation(data);
                }
                else if ($scope.processCoordinates(searchlocation) != null){
                    console.log("Making map by coordinates.")
                    $scope.createMap(searchlocation);
                }
                else{
                    $('#map').replaceWith('<div id="map">You done f**d up.</div>')
                }
            })
            .error(function(err, status){
                console.log(err);
                console.log(status);
            })
    }

    $scope.processCoordinates = function(coordinates){
        console.log("coordinates")
        var res = coordinates.split(" ");
        var lati = parseFloat(res[0])
        var lon = parseFloat(res[1])
        if (isNaN(lati) || isNaN(lon)){
            return null
        }
        else{
            return [lati, lon]
        }
    }

    $scope.createMap = function(coordinates){
        //takes in coordinates and changes the map location to that
        $('#map').replaceWith('<div id="map" style="width:500px; height:300px;"></div>')
//        console.log('passed')
        coords = $scope.processCoordinates(coordinates)
        lati = coords[0];
        lon = coords[1];
//        console.log(lati)
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
        MQA.withModule('largezoom', function() {
            mapthing.addControl(new MQA.LargeZoom());
        });
        window.map = mapthing;
    }

    $scope.createLocation = function() {
//        console.log($scope.address);
        booklocation = {name: $scope.name, address: $scope.address, coordinates: $scope.coordinates, bookshelf: $scope.bookshelf, description: $scope.description};
        $http.post("/addLocation", booklocation)
            .success(function(data) {             
                $scope.createMapLocation(booklocation);
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

    $scope.createMapLocation = function(pinlocation){
        console.log("Addint map location")
        $('#map').replaceWith('<div id="map" style="width:500px; height:300px;"></div>')
        console.log('passed')
        coords = $scope.processCoordinates(pinlocation.coordinates)
        lati = coords[0];
        lon = coords[1];
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
        MQA.withModule('largezoom', function() {
            // add the Large Zoom control
            mapthing.addControl(new MQA.LargeZoom());
        });
        // create a POI by passing in a lat/lng object to the MQA.Poi constructor
        var info = new MQA.Poi({ lat: lati, lng: lon });
        // set the rollover content for the POI
        info.setRolloverContent(pinlocation.name);
        // set the InfoWindow contents for the POI
        //  - by default, the HTML content will be displayed when the POI receives a mouseclick event
        info.setInfoContentHTML(pinlocation.bookshelf);
        // add POI to the map's default shape collection
        mapthing.addShape(info);
        window.map = mapthing;
    }

    // $scope.setBook = function(book){
    //     console.log(book)
    //     url = "https://www.goodreads.com/search/index.xml"
    //     data = "?key=IiXhpeA7SZ5r0z4ndE2BEg" + encodeURIComponent('&') + "q=Redshirts";
    //     console.log((url + data))
    //     $.get(url+data)
    //         .done(function(data, status){
    //             console.log(data)
    //             console.log(data.results[0])
    //         })
    //         .error(function(err, status){
    //             console.log(status)
    //             console.log(err)
    //         })
    // }

}
