var express = require('express');
var request = require('request')
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/finalproject';


function restrict(req, res, next) {
    if (req.session.access_token) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/index.html')
});
router.get('/login', function(req, res) {
    //   res.redirect('login');
    res.render('login.html')
});
router.get('/home', function(req, res) {
    //   res.redirect('login');
    res.render('home.html')
});


//some db helpers, should be factored out of here

var insertRecords = function(favs, db, callback) {
	// Get the documents collection
	var collection = db.collection('favorites');
	// Insert some documents
	collection.insert(favs, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted user to DB");
		return callback(err, result);
	});
}



var findRecords = function(db, callback) {
	var collection = db.collection('favorites');

	collection.find({}).toArray(function(err, result) {
		console.log('retrieved restult', result)
		assert.equal(err, null);
		return callback(err, result)
	})
}

router.post('/api/favorites', function(req, res) {
	console.log('in api post /favorites', req.body)
		// handleAddUser(req.body, function(err, results){
		// 	assert(null, err);
		// 	res.json(results)
		// })
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

		insertRecords(req.body, db, function(err, result) {
			findRecords(db, function(err, result) {
				db.close();
				res.json(result);
			})
		});
	});

});

router.get('/api/auth', function(req, res, next) {
		console.log('in auth callback')

		//exchange for authcode

		var auth_code = req.query['code'];
		console.log(auth_code);
		var redirect_uri = 'http://localhost:3000/api/auth'
		var client_id = 'abe797dd0bcf8911c15a';
		var client_secret = 'c81727a569562b9089c8a8ccd8499f958a0b666f';

		var validatequery = 'client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + auth_code + '&redirect_uri=' + redirect_uri;


		request.post({
				url: 'https://github.com/login/oauth/access_token',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				body: validatequery
			},
			function(err, postResp, body) {
				if (err) {
					console.log('validate token error' + err)
					return;
				} else if (postResp.statusCode != 200) {
					console.log('Could not validate token' + postResp.statusCode)
						//console.log(validatequery);
						//console.log(encodeURIComponent(validatequery));
				} else {
					console.log('validate token success', body);
					var bodyResp = JSON.parse(body)
					console.log('response object', bodyResp);
					var token = bodyResp['access_token'];
					//var userid = bodyResp['access_token'].userid;
					console.log('access token', token)

					req.session.regenerate(function() {
						req.session.access_token = token;
						//res.redirect('/');
						res.redirect('/');
					});

				}
			}//anon
		)//post
});

module.exports = router;
