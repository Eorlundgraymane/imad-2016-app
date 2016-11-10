var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;//Postgres connetion pool
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = 
		{
			user: 'eorlundgraymane',//credentials used to login to db in this case imad db
			database: 'eorlundgraymane',
			host: 'db.imad.hasura-app.io',
			port: 5432,
			password: 'db-eorlundgraymane-6283'//console provided variable containing password
		};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: "someRandomSecretKey",
    cookie: {maxAge: 1000*60*60*24*30}
}));

var pool = new Pool(config);//create connection pool object

function hash(input,salt){
	var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function (req,res){
	var hashed = hash(req.params.input,'this-is-a-random-string');
	res.send(hashed);
}); 

app.post('/login',function(req,res){	
	var email = req.body.email;
	var password = req.body.password;	
	pool.query('SELECT * FROM codeusers WHERE email like $1',[email],function(err,result){
			if(err){
			res.send(500).send(err.toString());
		}
		else
			{
					if(result.rows.length ===0){
						res.send(403).send('email/password is invalid');
					}
					else{
						var dbString = result.rows[0].passwordhash;
						var salt = dbString.split('$')[2];
						var hashedPassword = hash(password,salt);
						if(hashedPassword === dbString){
						    req.session.auth = {useId: result.rows[0].id};
							res.send(200).send('credentials are correct');
						}
						else
							{
								res.send(403).send('Username/password is invalid');
							}
					}
			}
	});
});
app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId)
   {
       res.send("User logged in "+req.session.auth.userId.toString());
       
   }
   else
   {
       res.send("Not Logged in");
   }
});
app.post('/create-user',function(req,res){
	
	var email = req.body.email;
	var password = req.body.password;
	var fname  = req.body.fname;
	var lname = req.body.lname;
	var dob = req.body.dob;
	var salt = crypto.randomBytes(128).toString('hex');
	var dbString = hash(password,salt);
	pool.query('INSERT INTO codeusers (fname,lname,passwordhash,email,dateob) VALUES ($1,$2,$3,$4,$5)',[fname,lname,dbString,email,dob],function(err,result){
			if(err){
			res.status(500).send(err.toString());
		}
		else
			{
					res.send('User Successfully created !'+username);
			}
	});
});

app.get('/', function (req, res) {//Root site directory. the first page that gets opened
 res.sendFile(path.join(__dirname,'ui','coderider.html'));
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
app.get('/login.html',function(req,res){
	res.sendFile(path.join(__dirname,'ui','login.html'));
});
app.get('/signup.html',function(req,res){
	res.sendFile(path.join(__dirname,'ui','signup.html'));
});
app.get('/signupscript',function(req,res){
	res.sendFile(path.join(__dirname,'ui','signup.js'));
});
app.get('/loginstyle.css',function(req,res){
	res.sendFile(path.join(__dirname,'ui','loginstyle.css'));
});
app.get('/main.js', function (req, res) {//the main javascript file
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/signup.js', function (req, res) {//the main javascript file
  res.sendFile(path.join(__dirname, 'ui', 'signup.js'));
});
app.get('/codeforge',function (req,res){//the first of the three blog pages
    res.sendFile(path.join(__dirname,'ui', 'codeforge.html'));
});
app.get('/pages/:pagename',function(req,res){
	res.sendFile(path.join(__dirname,'ui',[req.params.pagename]+".html"));
});
app.get('/styles/:pagename',function(req,res){
	res.sendFile(path.join(__dirname,'ui',[req.params.pagename]+".css"));
});
app.get('/scripts/:pagename',function(req,res){
	res.sendFile(path.join(__dirname,'ui',[req.params.pagename]+".js"));
});
app.get('/userlist',function(req,res){//in case the db is called
	var email = "rkmenon235@gmail.com";
	var pwd = "rkm235";
	pool.query('SELECT fname FROM "codeusers";', function(err , result){//what query to be passed
		if(err){
			res.status(500).send(err.toString());//if error is found show 500 error
		}
		else{
		    	res.send('<html><link href="/forgestyle.css" rel="stylesheet"/><script type="text/javascript" src="/forgemain.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script><body id = "container"><div id = "forgehammer">');
		    for(i = 0;i< result.rows.length ;i++)
			{var len = JSON.stringify(result.rows[i].fname).length;
		    res.send('Welcome to the Highway '+JSON.stringify(result.rows[i].fname).substring(1,len-1)+'<br>Your name was indeed dynamically retreived from the database via an SQL query</div><br><br>');
			}
		res.send('<div id = "leftmarg">More Updates Coming Soon</div></body></html>');//else return the query result as a JSON string
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
