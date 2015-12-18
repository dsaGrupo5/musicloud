var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";

//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
});

$("#log_out").click(function(e){
	e.preventDefault();
	var objetoLogout = new Object();
	objetoLogout.login = LOGIN;
	getlogout(objetoLogout, TOKEN);
	
});

function getlogout(objetoLogout, TOKEN) 
{
	var url = API_BASE_URL + '/login/login_out';	
	$.ajax({
		url : url,
		type : 'POST',
		data : $.param(objetoLogout),
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		window.location = "http://localhost/index.html" ;		 
  	}).fail(function() {
		alert ('logout fail!')
	});
}