//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.PORT || 5000;

//db config
var mongoDB = 'mongodb://ajain9:hpdeskjet1050@ds247678.mlab.com:47678/blogs';
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


// app.get('/', function (req, res) {
//      res.send('Hello Dev!');
//  });

router.get('/api', function(req, res) {
    res.send('Api Initialized!');  
});

// about page route (http://localhost:8080/about)
// router.get('/about', function(req, res) {
//     res.send('im the about page!'); 
// });


//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

router.route('/update')
	 .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });	
  })

	.put(function(req, res){
		console.log(req.body)
		if (req.body.tags == 'hungry_rides') {
	 Comment.update({ '_id' :  '5ab715b369d5cf000401d511' } ,
    { $push: { 'hungry_rides' :  { 'key' : req.body.key, 'title' : req.body.title , 'content' : req.body.content , 'tags' : req.body.tags , 'image' : req.body.image} }}, 
    {upsert: true},
    function(err, doc) {
        if(err){
        console.log(err)
        }else{
        res.json({ message: 'Comment successfully updated! hungry_rides' });	
        //do stuff
        }
       })
    }
    else if(req.body.tags == 'food_walks'){
    	Comment.update({ '_id' :  '5ab715b369d5cf000401d511' } ,
    { $push: { 'food_walks' :  {'key' : req.body.key,'title' : req.body.title , 'content' : req.body.content , 'tags' : req.body.tags , 'image' : req.body.image} }}, 
    {upsert: true},
    function(err, doc) {
        if(err){
        console.log(err)
        }else{
        res.json({ message: 'Comment successfully updated! food_walks' });	
    }
})
 }
 else if(req.body.tags == 'about'){
 	  	Comment.update({ '_id' :  '5ab715b369d5cf000401d511' } ,
    { $push: { 'about' :  {'key' : req.body.key,'title' : req.body.title , 'content' : req.body.content , 'tags' : req.body.tags , 'image' : req.body.image} }}, 
    {upsert: true},
    function(err, doc) {
        if(err){
        console.log(err)
        }else{
        res.json({ message: 'Comment successfully updated!  about' });	
    }
});
 }
})
.delete(function(req , res){
    Comment.remove({ '_id' :  '5ab715b369d5cf000401d511' },
     function(err, comment) {
     if (err)
       res.send(err);
     res.json({ message: 'Comment has been deleted' })
   })
 });

// apply the routes to our application
app.use('/api', router);



// Listen to port 5000
app.listen(port, function () {
    console.log('Dev app listening on port 5000!');
 });



//now  we can set the route path & initialize the API
// router.get('/', function(req, res) {
//   res.json({ message: 'API Initialized!'});
// });





// //Use our router configuration when we call /api
// app.use('/api', router);

