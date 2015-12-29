var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";



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


 
$("#subircancion").click(function(e) {
	e.preventDefault();
	
	var archivoSeleccionado = document.getElementById("cancion");
	var archivo = archivoSeleccionado.files[0];
	
	
	if($("#artista").val() == "" || $("#nombrecancion").val() == "" || $("#genero").val() == "")
	{
		if($("#artista").val() == "")
		{
			document.getElementById('artista').style.background='#EC991B';
			$('#artista').attr('placeholder','CAMPO ARTISTA OBLIGATORIO');
		}
		if($("#nombrecancion").val() == "")
		{
			document.getElementById('nombrecancion').style.background='#EC991B';
			$('#nombrecancion').attr('placeholder','NOMBRE CANCIÓN OBLIGATORIO');
		}
		if($("#genero").val() == "")
		{
			document.getElementById('genero').style.background='#EC991B';
			$('#genero').attr('placeholder','GÉNERO OBLIGATORIO');
		}
		
	}
	else
	{
		if (!archivo){
			alert ('Es necesario adjuntar archivo!');			
		}
		else
		{		
			var nuevaCancion	= new Object();
			
			nuevaCancion.file = archivo;
			nuevaCancion.artista = $("#artista").val();
			nuevaCancion.nombre = $("#nombrecancion").val();
			nuevaCancion.genero = $("#genero").val();	
			
			
			console.log(nuevaCancion);
			console.log(TOKEN);
			
			cargar_cancion(nuevaCancion, TOKEN);	
		}
	
	}
	
	
});



function cargar_cancion(nuevaCancion,TOKEN) 
{
	
	//var data = JSON.stringify(cancion);
	var data = nuevaCancion;
	alert ('entra en funcion!');
	var url = API_BASE_URL + '/cancion/cargarcancion';
	    $.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		contentType : 'application/vnd.dsa.musicloud.cancion+json',
		data : data,
		headers: {"X-Auth-Token":TOKEN},		
	}).done(function(data, status, jqxhr){
		alert ('Canción disponible en servidor!');
		//window.location = "http://localhost/home_admin.html" ;	
	}).fail(function(){
		alert ('Error en al subir canción!');
	});
}



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
		alert ('logout fail!');
	});
}
	

/*
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
}*/

