var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;//Postgres connetion pool
var config = 
		{
			user: 'eorlundgraymane',//credentials used to login to db in this case imad db
			database: 'eorlundgraymane',
			host: 'db.imad.hasura-app.io',
			port: 5432,
			password: 'db-eorlundgraymane-6283'//console provided variable containing password
		}
var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);//create connection pool object

app.get('/', function (req, res) {//Root site directory. the first page that gets opened
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/style.css', function (req, res) {//the style page for the home page
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/madi.png', function (req, res) {//image file
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/Coder.png', function (req, res) {//image file
  res.sendFile(path.join(__dirname, 'ui', 'Coder.png'));
});
app.get('/skyforge.png', function (req, res) {//image file
  res.sendFile(path.join(__dirname, 'ui', 'skyforge.png'));
});
app.get('/main.js', function (req, res) {//the main javascript file
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/codeforge',function (req,res){//the first of the three blog pages
    res.sendFile(path.join(__dirname,'ui', 'codeforge.html'));
});
app.get('/pages/:pagename',function(req,res){
	pool.query('SELECT html from "pages" where pagename like '+"'"+req.params.pagename+"'",function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}
		else
			{
				if(result.rows.length === 0){
					res.status(404).send('Article not found');		
				}
				else{
					var pageBody = result.rows[0];
					res.send(pageBody.html);
				}
			}
	});
});
app.get('/styles/:pagename',function(req,res){
	pool.query('SELECT css from "pages" where pagename like '+"'"+req.params.pagename+"'",function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}
		else
			{
				if(result.rows.length === 0){
					res.status(404).send('Article not found');		
				}
				else{
					var pageBody = result.rows[0]["css"];
					var len = pageBody.length;
					res.send(pageBody);
				}
			}
	});
});
app.get('/scripts/:pagename',function(req,res){
	pool.query('SELECT js from "pages" where pagename like '+"'"+req.params.pagename+"'",function(err,result){
		if(err){
			res.status(500).send(err.toString());
		}
		else
			{
				if(result.rows.length === 0){
					res.status(404).send('Article not found');		
				}
				else{
					var pageBody = result.rows[0]["js"];
					var len = pageBody.length;
					res.send(pageBody);
				}
			}
	});
});
app.get('/userlist',function(req,res){//in case the db is called
	var email = "rkmenon235@gmail.com";
	var pwd = "rkm235";
	pool.query('SELECT name FROM "Accounts" WHERE email like '+"'"+email+"' and pass like "+"'"+pwd+"';", function(err , result){//what query to be passed
		if(err){
			res.status(500).send(err.toString());//if error is found show 500 error
		}
		else{
			var len = JSON.stringify(result.rows[0]["name"]).length;
			res.send('<html><link href="/forgestyle.css" rel="stylesheet"/><script type="text/javascript" src="/forgemain.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script><body id = "container"><div id = "forgehammer">Welcome to the Highway '+JSON.stringify(result.rows[0]["name"]).substring(1,len-1)+'<br>Your name was indeed dynamically retreived from the database via an SQL query</div><br><br><div id = "leftmarg">More Updates Coming Soon</div></body></html>');//else return the query result as a JSON string
		}
	});
});
app.get('/forgestyle.css',function (req,res){//style of the codeforge page
    res.sendFile(path.join(__dirname,'ui', 'forgestyle.css'));
});
app.get('/forgemain.js',function (req,res){//the main javascript of the codeforge page
    res.sendFile(path.join(__dirname,'ui', 'forgemain.js'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});