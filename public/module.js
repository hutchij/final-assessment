//will contain angular objects
var App = angular.module('AppModule', ['ngRoute']);
App.run(function($rootScope) {
    $rootScope.bootstrapper = 'You have successfully bootstrapped AngularJS';




});

//I could not get this to work
// App.config(['$routeProvider', '$locationProvider',
//   function($routeProvider, $locationProvider) {
//     $routeProvider
//       .when('/home', {
//         templateUrl: 'book.html',
//         controller: 'GiffyListCtrl'
//       })
//       .when('/login', {
//         templateUrl: 'login.html'
//       });

//     $locationProvider.html5Mode(true);
// }])

//simple controller for login
App.controller('LoginCtrl',['$scope', '$http', function($scope, $http){

    $scope.login = function() {
        console.log('GiffyListCtrl select called with gif: ', gif);
        //not yet implemented, should call out to GitHub which is currently just done from HTML

    }

}])

//define a controller for the giffy brwoser list
App.controller('GiffyListCtrl',['$scope', '$http', function($scope, $http){

	//some scope variable to hold the restuls
	//$scope.giflist = fakeData;
	$scope.giflist = [];
	$scope.selected = [];

	//more scope to manage favorites
	$scope.privGiflist = [];
	$scope.privSelected = [];


	//controller initialization 
	//1) load gifs from the internet
	//2) load private gifs

	//populate the data on load
	//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

    $http({
    method: 'GET',
    url: "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC",
    headers: {'Accept': 'application/json'}})
    .then(function(response) {
        //success
        console.log('successfully fetch giffy data', response.data.data)
        $scope.giflist = response.data.data;
    }, function(response) {
        console.log('error fetching giffy data', response)
        $scope.giflist = [];
    });

   

    //popluate favorites

	//call our own backend to get the GIF data
    $http({
    method: 'GET',
    url: "http://api/favorites",
    headers: {'Accept': 'application/json'}})
    .then(function(response) {
        //success
        console.log('successfully fetch giffy data', response.data.data)
        $scope.privGiflist = response.data.data;
        $scope.privSelected = [];
    }, function(response) {
        console.log('error fetching giffy data', response)
        $scope.privGiflist = [];
        $scope.privSelected = [];
   });


    //when the user select a public GIF
     $scope.selectToSave = function(gif) {
        console.log('GiffyListCtrl select called with gif: ', gif)
        $scope.selected.push(angular.copy(gif))
    }

    //when the user selects a favorite to remove
     $scope.selectToDelete = function(gif) {
        console.log('GiffyListCtrl select called with gif: ', gif)
        $scope.privSelected.push(angular.copy(gif))
    }


    //save favorites to teh backend
    $scope.saveFavorites = function() {
        console.log('GiffyListCtrl save called.')

        //persist this to the backend
        $http({
        method: 'POST',
        url: "/api/favorites",
        data: angular.copy($scope.selected),
        headers: {'Content-Type': 'application/json'}})
        .then(function(response) {
            //First function handles success
         $scope.selected = [];
         $scope.privSelected = [];
         $scope.privGiflist = response.data;
       }, function(response) {
            //Second function handles error
            $scope.selected = [];
         $scope.privSelected = [];
         $scope.privGiflist = [];
       });


        //clear the selection
        $scope.selected = [];

    }



    //push the selection to teh backend
    //TODO remove a selection from storage
    $scope.deleteFavorites = function() {
        console.log('GiffyListCtrl save called.')

        //persist this to the backend
        $http({
        method: 'DELETE',
        url: "/api/favorites",
        data: angular.copy($scope.privSelected),
        headers: {'Content-Type': 'application/json'}})
        .then(function(response) {
            //First function handles success
            $scope.privSelected = [];
            $scope.privGiflist = response.data;
        }, function(response) {
            //Second function handles error
            $scope.privSelected = [];
            $scope.privGiflist = [];
        });


        //clear the selection
        $scope.privSelected = [];

    }







    //a method to remove from storage
    //TODO
    $scope.deleteFavorites = function(gif) {
        console.log('PrivateGifsCtrl select called with gif: ', gif)
        $scope.selected.push(angular.copy(gif))
    }
}])


//a controller to manage favirote gifs saved to the server
App.controller('PrivateGifsCtrl',['$scope', '$http', function($scope, $http){




}])


//data for testing below

var fakeData =   [
    {
      "type": "gif",
      "id": "64zSh1uTE7xxm",
      "slug": "cat-funny-64zSh1uTE7xxm",
      "url": "http://giphy.com/gifs/cat-funny-64zSh1uTE7xxm",
      "bitly_gif_url": "http://gph.is/1sGq99P",
      "bitly_url": "http://gph.is/1sGq99P",
      "embed_url": "http://giphy.com/embed/64zSh1uTE7xxm",
      "username": "",
      "source": "http://wifflegif.com",
      "rating": "g",
      "content_url": "",
      "source_tld": "wifflegif.com",
      "source_post_url": "http://wifflegif.com",
      "is_indexable": 0,
      "import_datetime": "2016-06-15 15:11:49",
      "trending_datetime": "1970-01-01 00:00:00",
      "images": {
        "fixed_height": {
          "url": "https://media3.giphy.com/media/64zSh1uTE7xxm/200.gif",
          "width": "356",
          "height": "200",
          "size": "2251285",
          "mp4": "https://media3.giphy.com/media/64zSh1uTE7xxm/200.mp4",
          "mp4_size": "155782",
          "webp": "http://media3.giphy.com/media/64zSh1uTE7xxm/200.webp",
          "webp_size": "1053250"
        }
        }
    },
     {
      "type": "gif",
      "id": "64zSh1uTE7zzm",
      "slug": "cat-funny-64zSh1uTE7xxm",
      "url": "http://giphy.com/gifs/cat-funny-64zSh1uTE7xxm",
      "bitly_gif_url": "http://gph.is/1sGq99P",
      "bitly_url": "http://gph.is/1sGq99P",
      "embed_url": "http://giphy.com/embed/64zSh1uTE7xxm",
      "username": "",
      "source": "http://wifflegif.com",
      "rating": "g",
      "content_url": "",
      "source_tld": "wifflegif.com",
      "source_post_url": "http://wifflegif.com",
      "is_indexable": 0,
      "import_datetime": "2016-06-15 15:11:49",
      "trending_datetime": "1970-01-01 00:00:00",
      "images": {
        "fixed_height": {
          "url": "https://media3.giphy.com/media/64zSh1uTE7xxm/200.gif",
          "width": "356",
          "height": "200",
          "size": "2251285",
          "mp4": "https://media3.giphy.com/media/64zSh1uTE7xxm/200.mp4",
          "mp4_size": "155782",
          "webp": "http://media3.giphy.com/media/64zSh1uTE7xxm/200.webp",
          "webp_size": "1053250"
        }
        }
    }];   