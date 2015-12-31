var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";

//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	
	obtenerCATALOGO(TOKEN);
});

$("#log_out").click(function(e){
	e.preventDefault();
	var objetoLogout = new Object();
	objetoLogout.login = LOGIN;
	getlogout(objetoLogout, TOKEN);
	
});

$("#baja").click(function(e){
	e.preventDefault();
	var objetoBaja = new Object();
	objetoBaja.login = LOGIN;
	darserdebaja(objetoBaja, TOKEN);	
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

function darserdebaja(objetoBaja, TOKEN) 
{
	var url = API_BASE_URL + '/users/eliminar/'+ objetoBaja.login;
	$.ajax({
		url : url,
		type : 'DELETE',
		headers: {"X-Auth-Token":TOKEN} 
	}).done(function(data, status, jqxhr) {
		alert ('Baja realizada correctamente');
		window.location = "http://localhost/index.html" ;		
  	}).fail(function() {
		alert ('fallo baja');
	});

}
function insertarCATALOGO(data){
	var canciones = data.canciones;
		$.each(canciones, function(i, v)
		{
			var cancion= v; 
			$("#catalogo").append("<tr><td data-th="+"Artista"+">" +cancion.artista+"</td><td data-th="+"Nombre" +">" +cancion.nombre +"</td><td data-th="+"Genero" +">" +cancion.genero +"</td><td data-th="+"Acciones"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\"><span class=\"fa fa-play\"></span></button>"+"         "+"<button type=\"button\" class=\"btn btn-xs btn-default command-edit\"><span class=\"fa fa-plus\"></span></button></td></tr>");
		})  
	
}

function insertarNuevo(data){
	var canciones = data.canciones;
		$.each(canciones, function(i, v)
		{
			var cancion= v; 
			$("#grid-data").append("<div class="+"promo"+"><div class="+"deal"+"><span>Artista: "+cancion.artista+"</span><span>Género: "+cancion.genero+"</div></span><span class="+"price"+">"+cancion.nombre+"</span>"+cancion.genero +"<button>Sign up</button></div>");
		})  
	
}


function obtenerCATALOGO(TOKEN){
	console.log(TOKEN);
	var url = API_BASE_URL + '/cancion/catalogo_canciones';
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.cancion.coleccion+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		console.log(data);
		insertarCATALOGO(data);
		insertarNuevo(data);
  	}).fail(function() {
		alert ('fallo ');
	});
}
