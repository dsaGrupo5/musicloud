var API_BASE_URL = "http://127.0.0.1:8080/musicloud";  //local
//var API_BASE_URL = "http://147.83.7.205:9090/musicloud";  //produccion
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";
var IDUSER= "";
var cancioncoleccion="";
var MAX2 ="";
//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	IDUSER = $.cookie('iduser');
	
	MAX2= 0;
	VIST= 0;
	$.cookie('vist', VIST);
	$.cookie('max', MAX2);
	
	obtenerLISTASUSUARIO(TOKEN,LOGIN);
	obtenerCATALOGO(TOKEN);
});

$("#log_out").click(function(e){
	e.preventDefault();
	var objetoLogout = new Object();
	objetoLogout.login = LOGIN;
	getlogout(objetoLogout, TOKEN);	
});

$("#añadirlista").click(function(e){
	e.preventDefault();
	if($("#nombrelistanueva").val() == "")
		{
			document.getElementById('nombrelistanueva').style.background='#F6B5B5';
			$('#nombrelistanueva').attr('placeholder','RELLENE EL CAMPO');
		}else{
			intlista = new Object;
			intlista.iduser=IDUSER;
			intlista.nombre= $("#nombrelistanueva").val();		
			insertarNUEVALISTA(intlista,TOKEN,LOGIN);
			document.getElementById('nombrelistanueva').style.background='#FFFFFF';
			document.getElementById('nombrelistanueva').value=null;
		}
});

$("#baja").click(function(e){
	e.preventDefault();
	if(confirm("¿Quieres eliminar tu perfil?")) {

		var objetoBaja = new Object();
		objetoBaja.login = LOGIN;
		darserdebaja(objetoBaja, TOKEN);

	}	
	
});

$("body").on("click","#botonreproducir",function(event)
{
	        event.preventDefault();
            var valores="";
		    var rest="";
		    var nombre="";
		    var artista="";
		    var url="";
			var nombres = new Array(8);
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            artista= nombres[0];
			nombre= nombres[1];
			url= nombres[3];
            
			cargarcancionREPRODUCTOR(artista,nombre,url)
      });
$("body").on("click","#botonreproducirlista",function(event)
{
	        event.preventDefault();
            var valores="";
		    var idlista="";
			var nombres = new Array(8);
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            idlista=nombres[1];
          
			obtenerLISTACANCIONEREPRODUCIRSUSUARIO(TOKEN,idlista);
      });
$("body").on("click","#botoneliminarlista",function(event)
{
	        event.preventDefault();
            var valores="";
		    var nombres = new Array(8);
			var idlista="";
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            idlista=nombres[1];
			eliminarLISTAUSUARIO(idlista,TOKEN,LOGIN);
});

$("body").on("click","#botoneditarlista",function(event)
{
	        event.preventDefault();
            var valores="";
		    var nombres = new Array(8);
			var idlista="";
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            idlista=nombres[1];
			$.cookie('idlista', idlista);
			var pagina = "http://localhost/editarlista.html";
			//var pagina = "http://eetacdsa2b.upc.es/editarlista.html";
			Abrir_ventana(pagina);
			
});

$("body").on("click","#botoninsertar",function(event)
{
	        event.preventDefault();
            var valores="";
		    var nombres = new Array(8);
			var id="";
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            id=nombres[4];
			var idlista="";
			var idlista = $("#listalistas").val();   
	
			
			obtenerCANCION(id,TOKEN,idlista);
			
			
});

 $("#siguiente").click(function(e){
	e.preventDefault();
	var tam = parseInt($.cookie('tam'));
	var posicion = parseInt($.cookie('max'));
	
	if(posicion < tam)
	{
		insertarCATALOGO(cancioncoleccion);
		
	}
		
});
$("#anterior").click(function(e){
	e.preventDefault();
	
	var VIST=parseInt($.cookie('vist'));
	if(VIST>6){
		insertarCATALOGO2(cancioncoleccion);
		}
	
});
$("#editaruser").click(function(e) {
	e.preventDefault();
	
		
	var nuevoUsuario	= new Object();
	
	nuevoUsuario.login = LOGIN;
	
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
			
	
	obtener_usuario(nuevoUsuario, TOKEN); 
	
	
	});
function editar_USUARIO(user,TOKEN) 
{
	console.log(user);
	
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
		
		
		document.getElementById('nombre').value=null;
		$('#nombre').attr('placeholder','Nombre');
		
		document.getElementById('apellidos').value=null;
		$('#apellidos').attr('placeholder','Apellidos');
		
		document.getElementById('email').value=null;
		$('#email').attr('placeholder','Email');
		
		
	}).fail(function(){
		alert ('Error en la edición!');
	});
}
function obtener_usuario(nuevoUsuario, TOKEN) 
{
	alert('entra onbtener');
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
		editar_USUARIO(user,TOKEN);
		console.log(user);
			
			
	}
	).fail(function()
	{
			alert ('obtener user mal');
	});	
}
function Abrir_ventana(pagina){
		var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=750, height=365, top=100, left=100";
		window.open(pagina,"",opciones);
}
function cargarlistaREPRODUCTOR(data)
{
	var canciones = data.canciones.canciones;
	console.log(canciones);
	$.each(canciones, function(i, v)
	    {
			var cancion=v;
		  $("#listacanciones").append("<li><a href="+cancion.url+"><b>"+cancion.artista+"</b> -"+cancion.nombre+"<span class="+"label"+">Explicit</span></a></li>");
		})
}
function obtenerLISTACANCIONEREPRODUCIRSUSUARIO(TOKEN,IDLISTA)
{	

	var url = API_BASE_URL + '/cancion/obtener_listausuario/'+IDLISTA;
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
	   
		
		cargarlistaREPRODUCTOR(data);
  	}).fail(function() {
		alert ('mierda');
	});
}
function modificarlista(CANCIONES, TOKEN, IDLISTA){
	console.log(CANCIONES);
	var data = JSON.stringify(CANCIONES);

	var de = API_BASE_URL + '/cancion/editar_listareproduccion/'+IDLISTA;
	$.ajax({
		url : de,
		type : 'PUT',
		data : data,
		dataType : 'json',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		
				
		
  	}).fail(function() 	{
		alert ('fallo putaaaaaaa');
	});
	
	
	
}

function obtenerLISTACANCIONESUSUARIO(cancion,TOKEN,IDLISTA)
{	
	var url = API_BASE_URL + '/cancion/obtener_listausuario/'+IDLISTA;
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(cancion,IDLISTA,TOKEN, function(data, status, jqxhr) {
			
		data.canciones.canciones.push(cancion);
		
		
		modificarlista(data, TOKEN, IDLISTA);
		
  	}).fail(function() {
		alert ('fallo obtenerLISTACANCIONESUSUARIO');
	});
}

function obtenerCANCION(idcancion,TOKEN,idlista)
{	
	var url = API_BASE_URL + '/cancion/obtener_cancion/'+idcancion;
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.cancion+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(idlista,function(data, status, jqxhr) {
		console.log(data);
		var cancion = data;
		obtenerLISTACANCIONESUSUARIO(cancion,TOKEN,idlista);
		
  	}).fail(function() {
		alert ('fallo ');
	});
}

function eliminarLISTAUSUARIO(idlista,TOKEN,LOGIN){
	var url = API_BASE_URL + '/cancion/eliminar_listausuario/'+ idlista;
	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,		
		headers: {"X-Auth-Token":TOKEN},		
	}).done(TOKEN,LOGIN,function(data, status, jqxhr){
		obtenerLISTASUSUARIO(TOKEN,LOGIN)		
	}).fail(function(){
		alert ('eliminar lista ko!');
	});
	
}
function insertarNUEVALISTA(intlista,TOKEN,LOGIN){
	var test= new Object;
	var url = API_BASE_URL + '/cancion/crear_listareproduccion';
	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,		
		contentType : 'application/x-www-form-urlencoded',
		data : $.param(intlista),
		headers: {"X-Auth-Token":TOKEN},		
	}).done(test,LOGIN,function(data, status, jqxhr){
		
		obtenerLISTASUSUARIO(TOKEN,LOGIN);
	}).fail(function(){
		alert ('fallo funcion insertarNUEVALISTA!');
	});
}
function cargarLISTASUSUARIOS(data)
{    alert('entra');
     console.log(data);
	var listas= data.listas;
	$('#listalistas').find('option').remove();
	$("#lista_usuario").find("tr:gt(0)").remove();
	
	$.each(listas, function(i, v)
	    {
			var lista= v; 
			$("#lista_usuario").append("<tr><td data-th=" +"artista" +">" +lista.nombre+
								  "</td><td data-th=" +"idlista" +" style=\"display:none\">" +lista.id+
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducirlista\"><span class=\"fa fa-play\"></span></button>"+" "+
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneditarlista\"><span class=\"fa fa-pencil-square-o\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneliminarlista\"><span class=\"fa fa-times\"></span></button></td></tr>");
           $("#listalistas").append("<option value="+lista.id+">"+lista.nombre+"</option>");								  
		})
								  
}	  
function cargarcancionREPRODUCTOR(artista,nombre,url)
{
	$("#listacanciones").append("<li><a href="+url+"><b>"+artista+"</b> -"+nombre+"<span class="+"label"+">Explicit</span></a></li>");

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
		//window.location = "http://eetacdsa2b.upc.es/index.html" ;			
  	}).fail(function() {
		alert ('fallo baja');
	});

}


function insertarCATALOGO(data)
{
	var tam=parseInt($.cookie('tam'));
	
	var mm=parseInt($.cookie('max'));
	$("#catalogo").find("tr:gt(0)").remove();
	var canciones = data.canciones;
	var i= 0;
	var VIST=parseInt($.cookie('vist'));
			
		while(i<6 && mm<tam){				
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +canciones[mm].artista+
								  "</td><td data-th="+"nombre"  +">" +canciones[mm].nombre +
								  "</td><td data-th="+"genero"  +">" +canciones[mm].genero +
								  "</td><td data-th="+"url"  +" style="+"display:none"+">"+canciones[mm].url +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">"+canciones[mm].id +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-music\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\" id=\"botoninsertar\"><span class=\"fa fa-plus\"></span></button></td></tr>"
								 );
								mm++;
								i++;
								
								
		    
		}
		if(i==6 || mm==tam){VIST=VIST+6;}	
								
		console.log('POSICION ARRAY= '+mm);
		console.log(' vist = :'+VIST);
		$.cookie('max', mm);
		$.cookie('vist', VIST);
			
			
			
			

}

function insertarCATALOGO2(data)
{
	
	var mm=parseInt($.cookie('max'));	
	var VIST=parseInt($.cookie('vist'));
    mm=VIST-12;
	$("#catalogo").find("tr:gt(0)").remove();
	var canciones = data.canciones;
	
		
		for(var i=0; i<6; i++)
		{
			
			
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +canciones[mm].artista+
								  "</td><td data-th="+"nombre"  +">" +canciones[mm].nombre +
								  "</td><td data-th="+"genero"  +">" +canciones[mm].genero +
								   "</td><td data-th="+"url"  +" style="+"display:none"+">"+canciones[mm].url +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">"+canciones[mm].id +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-music\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\" id=\"botoninsertar\"><span class=\"fa fa-plus\"></span></button></td></tr>"
								 );
								mm++;
								 
		    
		}
		VIST=VIST-6;
		console.log('POSICION ARRAY= '+mm);
		console.log(' vist = :'+VIST);
		$.cookie('max', mm);
		$.cookie('vist', VIST);
			

}

function obtenerCATALOGO(TOKEN)
{	
	var url = API_BASE_URL + '/cancion/catalogo_canciones';
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.cancion.coleccion+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		var tam = data.canciones.length;
		
		$.cookie('tam', tam);
		
		insertarCATALOGO(data);
		cancioncoleccion = data;
		
  	}).fail(function() {
		alert ('fallo ');
	});
}
function obtenerLISTASUSUARIO(TOKEN,LOGIN)
{
	var url = API_BASE_URL + '/cancion/obtener_coleccion_listausuario/'+LOGIN;
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario.coleccion+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
			console.log(data);
		    cargarLISTASUSUARIOS(data);
  	}).fail(function() {
		alert ('fallo ');
	});
}