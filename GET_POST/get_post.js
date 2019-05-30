//http://flip3.engr.oregonstate.edu:8675/

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8675);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('home');
});


//are there better variable choices than these? Copied this from assembly
app.get('/getpost', function(req, res){
	var aParam = [];
    //create an array to store
	for (var a in req.query) {
		aParam.push({'name': a, 'value': req.query[a]});
	}
	var context = {};
	context.data = aParam;
	res.render('get', context);
});

app.post('/getpost', function(req, res){
	var aParam = [];
    
    var content = ({});
    
	for (var a in req.query)
    {
		aParam.push({'name': a, 'value': req.query[a]});
	}
    
    var bParam = [];
    //create a new array ro recieve
	for (var b in req.body) 
    {
		bParam.push({'name': b, 'value': req.body[b]});
	}
	
    
	content.queryList = aParam;
    
    content.bodyList = bParam;
   
	res.render('post', content);
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Running on Port 7150');
});