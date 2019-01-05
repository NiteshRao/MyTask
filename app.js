var express = require('express');
var app = express();
var Dept = require(__dirname + '/dept');
var Employee = require(__dirname + '/employee');
var fs=require('fs');
app.set('port', process.env.PORT || 3100)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/Dept', Dept);
app.use('/Employee', Employee);
const db = require(__dirname + '/db');
var welcome = "<html><h1><center>Welcome to MyApp</center></h1><br><br><br><h5><center>App is running successfully.</center></h5></html>"

//Welcome Messages
app.get('/', function (req, res, next) {
    res.send(welcome)
    //res.send({Message:"App Running Successfully."})
})

//Setup Database
app.get('/Setup', function (req, res, next) {
   if(fs.existsSync(__dirname+'/SQL/db.lock'))
   {
       console.log('Setup Not Initialized');
       res.send('Setup Not Initialized');
   }
   else{
    console.log('Setup Initialized');   
    dropTablesAndFunctions(function(drop){
        if(drop)
        {
            createTable( function (create){
                if(create)
                {
                    deptFunctions(function(d_func){
                        if(d_func)
                        {
                            fs.writeFileSync(__dirname+'/SQL/db.lock','Setup Completed @'+new Date(Date.now()).toLocaleString())
                            console.log('Setup Completed @'+new Date(Date.now()).toLocaleString());
                            res.send('Setup Completed @'+new Date(Date.now()).toLocaleString());
                        }
                    });
                }
            });

        }
    })
 
   }
    //res.send({Message:"App Running Successfully."})
})

//Dropping tables and functions if exists.
function dropTablesAndFunctions(callback)
{
    var drop=fs.readFileSync(__dirname+'/SQL/dropTablesAndFunctions.sql').toString();
     db.any(drop).then((data)=>{
         console.log('1.Tables And Functions Dropped.');
         callback(true)
     })
}

//Creating tables
function createTable(callback)
{
    var createTable=fs.readFileSync(__dirname+'/SQL/createTables.sql').toString();
     db.any(createTable).then((data)=>{
         console.log('2.Tables Created.');
         callback(true);
     })
}

//Setting Up Dept functions
function deptFunctions(callback)
{
    var deptFunctions=fs.readFileSync(__dirname+'/SQL/deptFunctions.sql').toString();
     db.any(deptFunctions).then((data)=>{
        console.log('3.Dept Functions Created.');
        callback(true);
     })
}

//Starting the app
app.listen(app.get('port'), function (err) {
    if (err) {
        console.log("Error in connecting server");
    } else {
        console.log("Server Started http://localhost:" + app.get('port') + '/ @ ' + new Date(Date.now()).toLocaleString());
    }
});
