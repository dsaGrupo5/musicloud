var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var USERNAME = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";

//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	//USERID= $.cookie('userid');
	//LOGIN = $.cookie('login');
	//TOKEN = $.cookie('token');
});

$("#eliminaruser").click(function(e) {
	
	e.preventDefault();
	
	//CONTROL DE RELLENADO DE VARIABLES	
	if($("#login_eliminar").val() == ""){
		if($("#login_eliminar").val() == "")
			{
				document.getElementById('login_eliminar').style.background='#F6B5B5';
				$('#login_eliminar').attr('placeholder','RELLENE EL CAMPO');
			}
	}
	else
	{
		var nuevoUsuario	= new Object();	
		nuevoUsuario.login = $("#login_eliminar").val();

		eliminar_usuario(nuevoUsuario);
	}
});

function eliminar_usuario(usuario) 
{
	var url = API_BASE_URL + '/users/eliminar/'+ usuario.login;
	console.log(url);	
	$.ajax({
		url : url,
		type : 'DELETE',
		//headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		alert ('eliminar ok');			
  	}).fail(function() {
		alert ('fallo eliminar');	
	});

}