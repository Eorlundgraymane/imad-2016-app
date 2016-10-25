function view()
{
		var timeline = document.getElementById('blog');
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState === XMLHttpRequest.DONE)
				{
					if(request.status === 200)
						{
							var posty = request.responseText;
							timeline.innerHTML = '<fieldset><legend>Timeline Forge</legend><font color = "white">'+posty.value+'</font><br></fieldset>';
						}
				}
		};
	request.open('GET','/posty',true);
	request.send(null);
	alert("View Called");
}
function savepost()
{
		var textpost = document.getElementById('textpost');
		var request = new XMLHttpRequest();
		request.open('POST','/posty',async);
		request.setRequestHeader("Contect-Type","text/plain;charset=UTF-8");
		requst.send(textpost.value.toString);
}
function post()
{
	var timeline = document.getElementById('blog');
	timeline.innerHTML = '<fieldset><legend>Post Pad</legend><font color = "white"><textarea id = "textpost" style = "border-width: 0px; color: white; background-color: black" cols = "50" rows = "30" placeholder = "Post your thoughts"></textarea></font><br><input type = "submit" onclick = "savepost()" style = width: 150px;" value = "Post"/></fieldset>';
}
