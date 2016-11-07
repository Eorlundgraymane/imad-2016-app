$(document).ready(function(){var regy = document.getElementById('signupbutton');
alert(regy);});
regy.onclick = function(){
    alert(username.value);
    alert(password.value);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200)
				{
					console.log("user created");
					alert("Creates Account successfully");		
				}
			else if(request.status === 403){
				alert('Something is 404');
			}
			else if(request.status === 500){
				alert('Something is wrong on the server 500');
			}
		}
	};
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://eorlundgraymane.imad.hasura-app.io/create-user',true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username:username,password:password}));
};