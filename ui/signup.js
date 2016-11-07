alert("Sign Up Script Ready");
    var regy = document.getElementById('signupbutton');
    regy.onclick = function(){
    	var email = document.getElementById('email').value;
    	var password = document.getElementById('password').value;
    	var fname = document.getElementById('fname').value;
    	var lname = document.getElementById('lname').value;
    	var dob = document.getElementById('date').value;
    
    	var request = new XMLHttpRequest();
    	request.onreadystatechange = function(){
    		if(request.readyState === XMLHttpRequest.DONE){
    			if(request.status === 502)
    				{
    					console.log("user created");
    					alert("Creates Account successfully");		
    				}
    			else if(request.status === 403){
    				alert('Something is 403');
    			}
    			else if(request.status === 500){
    				alert('Something is wrong on the server 500');
    			}
    		}
    	};
    console.log(dob);
    console.log(email);
    request.open('POST','http://eorlundgraymane.hasura-app.io/create-user',true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({fname:fname,lname:lname,email:email,password:password,dob:dob}));
    };