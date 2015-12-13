var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var USERNAME = "";
var PASSWORD = "";

//FALTA MOSTRAR ERROR DE LOGIN DUPLICADO
//añadir login tras registro a la web de home_user

$(document).ready(function() {
});

$("#registrarse").click(function(e) {
	e.preventDefault();
	
	//CONTROL DE RELLENADO DE VARIABLES
	if($("#login").val() == "" || $("#nombre").val() == "" || $("#apellidos").val() == "" || $("#email").val() == ""|| $("#password").val() == "")
	{
		if($("#login").val() == "")
		{
			document.getElementById('login').style.background='#F6B5B5';
			$('#login').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#nombre").val() == "")
		{
			document.getElementById('nombre').style.background='#F6B5B5';
			$('#nombre').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#apellidos").val() == "")
		{
			document.getElementById('apellidos').style.background='#F6B5B5';
			$('#apellidos').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#email").val() == "")
		{
			document.getElementById('email').style.background='#F6B5B5';
			$('#email').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#password").val() == "")
		{
			document.getElementById('password').style.background='#F6B5B5';
			$('#password').attr('placeholder','RELLENE EL CAMPO');
		}
	}
	else
	{
		
	var nuevoUsuario	= new Object();
	nuevoUsuario.login = $("#login").val();
	nuevoUsuario.nombre = $("#nombre").val();
	nuevoUsuario.apellidos = $("#apellidos").val();
	nuevoUsuario.email = $("#email").val();	
	nuevoUsuario.password = $("#password").val();
	
	registrar_usuario(nuevoUsuario);
	}
});

function registrar_usuario(usuario){
var url = API_BASE_URL + '/users/registrar';

	var data = JSON.stringify(usuario);
	console.log(data);
	console.log(usuario);	
	
	$.ajax({
		url : url,
		type : 'POST',
		data : $.param(usuario),
		
	}).done(function(data, status, jqxhr) {
		 alert ('registro ok');	
  	}).fail(function() {
		alert ('Usuario login ya escogido. Debes cambiar el ID de usuario MusiCloud');
	});
}