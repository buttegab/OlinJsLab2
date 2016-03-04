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

}
