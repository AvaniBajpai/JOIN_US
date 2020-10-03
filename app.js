var express =require('express');
var mysql = require('mysql');
var bodyParser=require('body-parser');
var app =express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
var connection = mysql.createConnection({
  host :'localhost',
  port :'3306',
  user : 'root',
  password : 'devavani@2706',
  database :'join_us'
});

app.get("/",function(req,res){
  var q='SELECT COUNT(*) AS count FROM users';
  connection.query(q,function(err,results){
    if(err)throw err;
    var count=results[0].count;
    res.render("home",{data:count});
  });  
});

app.post("/register",function(req,res){
  var person={email:req.body.email};
  var q='INSERT INTO users SET ?';
  connection.query(q,person,function(err,result){
    if(err) throw err;
    res.redirect("/");
  });
});
app.listen(3000,function(){
  console.log('Server listening on port 3000');
});






