var express = require("express");     
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require('./dbcon.js');


app.engine("handlebars", handlebars.engine);        
app.set("view engine", "handlebars");
app.set("port", 7423);                              
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/reset-table',function(req,res,next){
    
    //clears table
    
    //thanks for the start, helpful for setting rest
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err){
            res.render('table',context);
        })
    });
});

app.get('/', function(req, res, next){
    
    
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){           
    if(err){ 
        next(err);
        return;
    }//for each item below
    var params = [];   
    for(var row in rows){
        var addItem = {'name': rows[row].name, 
                    'reps': rows[row].reps, 
                    'weight': rows[row].weight, 
                    'date':rows[row].date, 
                    'id':rows[row].id};
        //add them both to lbs, select text to show
        if(rows[row].lbs){
            addItem.lbs = "lbs";
        }
        else{
            addItem.lbs = "kg";
        }
        params.push(addItem);          //cycle through and add each
    }
    context.results = params;
    res.render('table', context);      //call the table
    })
});



app.get('/insert',function(req,res,next){
    
    //copied from lesson
  var context = {};//to send
   mysql.pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
    [req.query.exercise,         
    req.query.reps, 
    req.query.weight, 
    req.query.date, 
    req.query.unitCheck], 
    function(err, result){
        if(err){
          next(err);
          return;
            
        }         
        context.inserted = result.insertId;
        res.send(JSON.stringify(context));
  });
});

app.get('/delete', function(req, res, next) {
    
    
    var context = {};    //need id
    mysql.pool.query("DELETE FROM `workouts` WHERE id = ?",   
        [req.query.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
                
            }
    });
});

app.get('/updateTable',function(req, res, next){
    
    
    var context = {};//select all with ID 
    mysql.pool.query('SELECT * FROM `workouts` WHERE id=?',   
        [req.query.id], 
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            var param = [];

        for(var row in rows){        
            var addItem = {'name': rows[row].name, 
                        'reps': rows[row].reps, 
                        'weight': rows[row].weight, 
                        'date':rows[row].date, 
                        'lbs':rows[row].lbs,
                        'id':rows[row].id};

            param.push(addItem);
        }
        context.results = param[0];          
        res.render('updateTable', context);
    });
});

app.get('/update', function(req, res, next){
    
    
    var context = {};
//go by user is
    mysql.pool.query("SELECT * FROM `workouts` WHERE id=?", 
        [req.query.id], 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            if(result.length == 1){                
                var current = result[0];

                if(req.query.unitCheck === "on")
                {
                    req.query.unitCheck = "1";
                }
                else
                {
                    req.query.unitCheck = "0";
                }
                mysql.pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                [req.query.exercise || current.name, 
                req.query.reps || current.reps, 
                req.query.weight || current.weight, 
                req.query.date || current.date, 
                req.query.unitCheck, 
                req.query.id],
                function(err, result){
                    if(err){
                        next(err);
                        return;
                    }

                mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
                    if(err){
                        next(err);
                        return;
                    }
            var param = [];

        for(var row in rows){
            var addItem = {'name': rows[row].name, 
            'reps': rows[row].reps,
            'weight': rows[row].weight, 
            'date':rows[row].date, 
            'id':rows[row].id};

            if(rows[row].lbs){  
                addItem.lbs = "lbs";
            }
            else{
                addItem.lbs = "kg";
            }
            param.push(addItem);     //pushes to display
        }

                        context.results = param;
                        res.render('table', context);     //show all results
                    });
                });
            }
    });
});

app.use(function(req, res){ //copy from last handlebars
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){ //copy from last handlebars
	console.log(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function(){     //copy from last handlebars       
	console.log("Express started on port 7423");
});