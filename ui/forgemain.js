function view()
{
	alert("View Function called");
}
function post()
{
	alert("Post function ready");
	var timeline = document.getElementById('blog');
	timeline.innerHTML = '<fieldset><legend>Post Pad</legend><font color = "white"><textarea name = "textpost" style = "border-width: 0px; color: white; background-color: black" cols = "50" rows = "30" placeholder = "Post your thoughts"></textarea></font><br><input type = "submit" style = width: 150px;" value = "Post"/></fieldset>';
}
