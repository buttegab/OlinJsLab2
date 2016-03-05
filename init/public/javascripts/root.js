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
    $scope.createLocation = function() {
        $http.post("/addLocation", {name: $scope.name, address: $scope.address, coordinates: $scope.coordinates, bookshelf: $scope.bookshelf, description: $scope.description})
            .success(function(data) {
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
