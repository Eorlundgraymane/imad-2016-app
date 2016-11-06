function notyet()
{
	alert("We are not ready to accept new users yet. EEEEE");
}
function login()
{
	var emaily = document.getElementById('emailin').value;
	alert(emaily);
	var passy = document.getElementById('passin').value;
	alert(passy);
	var Pool = require('pg').Pool;//Postgres connetion pool
	var config = 
			{
				user: 'eorlundgraymane',//credentials used to login to db in this case imad db
				database: 'eorlundgraymane',
				host: 'db.imad.hasura-app.io',
				port: 5432,
				password: 'db-eorlundgraymane-6283'//console provided variable containing password
			}
	var pool = new Pool(config);
	pool.query("SELECT * FROM accounts WHERE email like '"+emaily+"' and password like '"+passy+"'",function(err,result){
		if(result.rows.length === 0){
			alert("Account Not Found");		
		}
		else{
			alert("Account Found");
		}
	});
}