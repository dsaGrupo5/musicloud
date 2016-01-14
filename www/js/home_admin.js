var API_BASE_URL =  "http://147.83.7.205:9090/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";

//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	console.log(TOKEN);
});

$("#log_out").click(function(e){
	e.preventDefault();
	
	var objetoLogout = new Object();
	objetoLogout.login = LOGIN;
	getlogout(objetoLogout, TOKEN);
	
});


 
$("#editauser").click(function(e) {
	e.preventDefault();
	
	//PQ SE COLOREA ANTES DE APRETAR EL BOTON DE EDITAR
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
		window.location =  "http://localhost/index.html" ;		 
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
		window.location =  "http://147.83.7.205:9090/home_admin.html" ;		
  	}).fail(function() {
			document.getElementById('login_eliminar').style.background='#F6B5B5';
			document.getElementById('login_eliminar').value=null;			
			$('#login_eliminar').attr('placeholder','USUARIO NO REGISTRADO');
	});

}

function editar_usuario(nuevoUsuario, TOKEN) 
{
	var url = API_BASE_URL + '/users/obtener/' + nuevoUsuario.login;
	
	$.ajax(
	{
		url : url,type : 'GET',
		crossDomain : true,	
		dataType : 'json',
		contentType : 'application/vnd.dsa.musicloud.user+json',
		headers: {"X-Auth-Token":TOKEN}
	}
	).success(function(data, status, jqxhr) 
	{
			
			var response = data;
			var user = new Object(response);
			
			if (nuevoUsuario.nombre != undefined)
			{						
				user.nombre= nuevoUsuario.nombre;				
			}
			
			if (nuevoUsuario.apellidos != undefined)
			{		
				user.apellidos= nuevoUsuario.apellidos;					
			}
			if (nuevoUsuario.email != undefined)
			{		
				user.email= nuevoUsuario.email;					
			}					
						
			insertarUsuario(user,TOKEN);
	}
	).fail(function()
	{
			alert ('obtener user mal');
	});	
}

function insertarUsuario(user,TOKEN) 
{
	
	var data = JSON.stringify(user);
	var url = API_BASE_URL + '/users/editar/' + user.login;
	    $.ajax({
		url : url,
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		contentType : 'application/vnd.dsa.musicloud.user+json',
		data : data,
		headers: {"X-Auth-Token":TOKEN},		
	}).done(function(data, status, jqxhr){
		alert ('Datos modificados correctamente!');
		window.location =  "http://147.83.7.205:9090/home_admin.html" ;	
	}).fail(function(){
		alert ('Error en la edición!');
	});
}

