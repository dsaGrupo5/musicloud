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


 
$("#editaruser").click(function(e) {
	e.preventDefault();
	
	//CONTROL DE RELLENADO DE VARIABLES
	if($("#login_editar").val() == "")
	{
		if($("#login_editar").val() == "")
		{
			document.getElementById('login_editar').style.background='#EC991B';
			$('#login_editar').attr('placeholder','CAMPO USER ID OBLIGATORIO');
		}
		
	}
	else
	{
		
	var nuevoUsuario	= new Object();
	nuevoUsuario.login = $("#login_editar").val();
	
		if($("#nombre").val() != "")
		{
			nuevoUsuario.nombre = $("#nombre").val();
		}
		if($("#apellidos").val() != "")
		{
			nuevoUsuario.apellidos = $("#apellidos").val();
		}
		if($("#email").val() != "")
		{
			nuevoUsuario.email = $("#email").val();	
		}
		if($("#password").val() != "")
		{
			nuevoUsuario.password = $("#password").val();
		}	
	
	editar_usuario(nuevoUsuario, TOKEN);
	
	}
});

$("#eliminaruser").click(function(e) {
	e.preventDefault();
	
	//CONTROL DE RELLENADO DE VARIABLES
	if($("#login_eliminar").val() == "")
	{
		document.getElementById('login_eliminar').style.background='#EC991B';
			$('#login_eliminar').attr('placeholder','CAMPO USER ID OBLIGATORIO');
	}
	else
	{
		
	var usuarioelim	= new Object();
	usuarioelim.login = $("#login_eliminar").val();
	
	eliminar_usuario(usuarioelim, TOKEN);
	
	}
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
	

function eliminar_usuario(usuarioelim, TOKEN) 
{
	var url = API_BASE_URL + '/users/eliminar/'+ usuarioelim.login;
	$.ajax({
		url : url,
		type : 'DELETE',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		alert ('Usuario eliminado correctamente');
		window.location = "http://localhost/home_admin.html" ;		
  	}).fail(function() {
			document.getElementById('login_eliminar').style.background='#F6B5B5';
			document.getElementById('login_eliminar').value=null;			
			$('#login_eliminar').attr('placeholder','USUARIO NO REGISTRADO');
	});

}