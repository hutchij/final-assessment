//will contain angular objects
var App = angular.module('AppModule', ['ngRoute']);
App.run(function($rootScope) {
    $rootScope.bootstrapper = 'You have successfully bootstrapped AngularJS';




});

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

//define a controller for the giffy brwoser list
App.controller('GiffyListCtrl',['$scope', '$http', function($scope, $http){

	//some scope variable to hold the restuls
	$scope.giflist = fakeData;
	$scope.selected = [];

	//populate the data on load
	//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

    $scope.select = function(gif) {
        console.log('GiffyListCtrl select called with gif: ', gif)
        $scope.selected.push(angular.copy(gif))
    }

    $scope.save = function() {
        console.log('GiffyListCtrl save called.')

        //persist this to the backend

    }
}])