var API_BASE_URL = "http://127.0.0.1:8080/musicloud";  //local
//var API_BASE_URL = "http://147.83.7.205:9090/musicloud";  //produccion
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";

//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	MAX2= 0;
	VIST= 0;
	$.cookie('vist', VIST);
	$.cookie('max', MAX2);
	obtenerlistaUSUARIOS(TOKEN);
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
			
	
	editar_usuario(nuevoUsuario, TOKEN);
	
	
	
	}
	
	
	});


$("body").on("click","#botoneliminaruser",function(event)
{
	        event.preventDefault();
            var valores="";
		    var nombres = new Array(8);
			var login="";
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
			alert(nombres);
            login=nombres[0];
			alert(login);
			eliminar_usuario(login, TOKEN);
			
});
function insertar_LISTAUSUARIOS(data){
	console.log(data);
	$("#lista_usuarios").find("tr:gt(0)").remove();
	usuarios= data.users;
	console.log(usuarios);
	$.each(usuarios, function(i, v)
	    {
			var user= v; 
			$("#lista_usuarios").append("<tr><td data-th=" +"login" +">" +user.login+
									   "</td><td data-th=" +"nombre" +">" +user.nombre+
									   "</td><td data-th=" +"apellidos" +">" +user.apellidos+
									   "</td><td data-th=" +"email" +">" +user.email+
									   "</td><td data-th="+"insertar"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneliminaruser\"><span class=\"fa fa-times\"></span></button></td></tr>");
           				  
		})
}
function obtenerlistaUSUARIOS(TOKEN){
	console.log(TOKEN);
	var url = API_BASE_URL + '/users/obtenerUSUARIOS';
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.user.coleccion+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		insertar_LISTAUSUARIOS(data);
 	}).fail(function() {
		alert ('fallo ');
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
		//window.location = "http://eetacdsa2b.upc.es/index.html" ;		 
  	}).fail(function() {
		alert ('logout fail!')
	});
}
	

function eliminar_usuario(login, TOKEN) 
{
	var url = API_BASE_URL + '/users/eliminar/'+login;
	$.ajax({
		url : url,
		type : 'DELETE',
		headers: {"X-Auth-Token":TOKEN}
	}).done(TOKEN,function(data, status, jqxhr) {
		
		obtenerlistaUSUARIOS(TOKEN);
				
  	}).fail(function() {
			alert('ko eliminar usuario');
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
			obtenerlistaUSUARIOS(TOKEN);
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
		
		document.getElementById('login_editar').value=null;
		$('#login_editar').attr('placeholder','ID Usuario a editar');
		
		document.getElementById('nombre').value=null;
		$('#nombre').attr('placeholder','Nombre');
		
		document.getElementById('apellidos').value=null;
		$('#apellidos').attr('placeholder','Apellidos');
		
		document.getElementById('email').value=null;
		$('#email').attr('placeholder','Email');
		
		obtenerlistaUSUARIOS(TOKEN);
		
	}).fail(function(){
		alert ('Error en la edición!');
	});
}

