var submit = document.getElementById('loginbutton');
submit.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200)
				{
					console.log("user logged in");
					alert("Logged in successfully");		
				}
			else if(request.status === 403){
				alert('Username/Password is invalid');
			}
			else if(request.status === 500){
				alert('Something is wrong on the server');
			}
		}
	};
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://localhost:8080/login',true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username:username,password:password}));
};