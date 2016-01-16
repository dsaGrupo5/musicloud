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
	
	MAX2='0';
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
			//var pagina = "http://localhost/editarlista.html";
			var pagina = "http://eetacdsa2b.upc.es/editarlista.html";
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
	
	var tamaño = $.cookie('tamaño');
	//tamaño--;
	var posicion = $.cookie('max');
	console.log(tamaño);
	console.log(posicion);
	if(posicion<tamaño){insertarCATALOGO(cancioncoleccion);}
	
	
});
$("#anterior").click(function(e){
	e.preventDefault();
	var tamaño = $.cookie('tamaño');
	var posicion = $.cookie('max');
	if(posicion>tamaño){insertarCATALOGO2(cancioncoleccion);}
	
});

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
{
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
		//window.location = "http://localhost/index.html" ;
		window.location = "http://eetacdsa2b.upc.es/index.html" ;			
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
		//window.location = "http://localhost/index.html" ;
		window.location = "http://eetacdsa2b.upc.es/index.html" ;			
  	}).fail(function() {
		alert ('fallo baja');
	});

}


function insertarCATALOGO(data)
{
	console.log(data);
	var mm=$.cookie('max');
	$("#catalogo").find("tr:gt(0)").remove();
	var canciones = data.canciones;
	var pin ="";
	var tamaño = $.cookie('tamaño');
	var tan ="";
	
	console.log('tamaño array canciones='+tamaño);
	console.log('posicion array'+mm);
	if(tamaño<6){tan=tamaño;}
	else{tan=6;}
	console.log('valor i'+tan);
		
		for(var i=0; i<tan; i++)
		{
			
			
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +canciones[mm].artista+
								  "</td><td data-th="+"nombre"  +">" +canciones[mm].nombre +
								  "</td><td data-th="+"genero"  +">" +canciones[mm].genero +
								  "</td><td data-th="+"url"  +" style="+"display:none"+">"+canciones[mm].url +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">"+canciones[mm].id +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-play\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\" id=\"botoninsertar\"><span class=\"fa fa-plus\"></span></button></td></tr>"
								 );
								mm++;
								 
		    
		}
		console.log(mm);
		$.cookie('max', mm);
			
			
			
			

}

function insertarCATALOGO2(data)
{
	console.log(data);
	var mm=$.cookie('max');	
	mm=mm-12;
	console.log(mm);
	$("#catalogo").find("tr:gt(0)").remove();
	var canciones = data.canciones;
	
		
		for(var i=0; i<6; i++)
		{
			
			
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +canciones[mm].artista+
								  "</td><td data-th="+"nombre"  +">" +canciones[mm].nombre +
								  "</td><td data-th="+"genero"  +">" +canciones[mm].genero +
								   "</td><td data-th="+"url"  +" style="+"display:none"+">"+canciones[mm].url +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">"+canciones[mm].id +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-play\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\" id=\"botoninsertar\"><span class=\"fa fa-plus\"></span></button></td></tr>"
								 );
								mm++;
								 
		    
		}
		$.cookie('max', mm);
			console.log(mm);		

}
function insertarNuevo(data)
{
	var canciones = data.canciones;
		$.each(canciones, function(i, v)
		{
			var cancion= v; 
			$("#grid-data").append("<div class="+"promo"+"><div class="+"deal"+"><span>Artista: "+cancion.artista+"</span><span>Género: "+cancion.genero+"</div></span><span class="+"price"+">"+cancion.nombre+"</span>"+cancion.genero +"<button>Sign up</button></div>");
		})	
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
		var tamaño = data.canciones.length;
		
		$.cookie('tamaño', tamaño);
		
		insertarCATALOGO(data);
		insertarNuevo(data);
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
			
		    cargarLISTASUSUARIOS(data);
  	}).fail(function() {
		alert ('fallo ');
	});
}