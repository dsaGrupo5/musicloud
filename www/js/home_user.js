var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";
var IDUSER= "";
//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	IDUSER = $.cookie('iduser');
	console.log(IDUSER);
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
	intlista = new Object;
	intlista.iduser=IDUSER;
	alert(intlista.iduser);
	intlista.nombre= $("#nombrelistanueva").val();		
	insertarNUEVALISTA(intlista,TOKEN,LOGIN);
});

$("#baja").click(function(e){
	e.preventDefault();
	var objetoBaja = new Object();
	objetoBaja.login = LOGIN;
	darserdebaja(objetoBaja, TOKEN);	
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
$("body").on("click","#botoneliminar",function(event)
{
	        var nombrelista;
	        event.preventDefault();
            nombrelista= ("#listas_usuario").getElementsByTagName('h3');
		    alert(nombrelista);
});  
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
		alert('insertar nueva lista ok');
		alert(TOKEN);
		alert(LOGIN);
		obtenerLISTASUSUARIO(TOKEN,LOGIN);
	}).fail(function(){
		alert ('fallo funcion insertarNUEVALISTA!');
	});
}
function cargarLISTASUSUARIOS(data)
{
	var listas= data.listas;
	console.log(listas);
	$.each(listas, function(i, v)
	    {
			var lista= v; 
			$("#lista_usuario").append("<tr><td data-th=" +"artista" +">" +lista.nombre+
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-play\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\"><span class=\"fa fa-plus\"></span></button></td></tr>");		
								  })
}	  
function cargarcancionREPRODUCTOR(artista,nombre,url)
{
	$("#listacanciones").append("<li><a href="+url+"><b>"+artista+"</b> -"+nombre+"<span class="+"label"+">Explicit</span></a></li>");

}
function cargarlistaREPRODUCTOR(data)
{
	var listas= data.listas;
	$.each(listas, function(i, v)
	{
	 $("#listacanciones").append("<li><a href="+listas.canciones.cancion.url+"><b>"+listas.canciones.cancion.url.artista+"</b> -"+listas.canciones.cancion.url.nombre+"<span class="+"label"+">Explicit</span></a></li>");
	})
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
function insertarCATALOGO(data)
{
	var canciones = data.canciones;
		$.each(canciones, function(i, v)
		{
			var cancion= v; 
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +cancion.artista+
								  "</td><td data-th="+"nombre"  +">" +cancion.nombre +
								  "</td><td data-th="+"genero"  +">" +cancion.genero +
								  "</td><td data-th="+"genero"  +">" +cancion.url +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botonreproducir\"><span class=\"fa fa-play\"></span></button>"+" "+
								  "</td><td data-th="+"insertar"+"><button type=\"button\" class=\"btn btn-xs btn-default command-edit\"><span class=\"fa fa-plus\"></span></button></td></tr>"
								 );
		    
		}) 
			
			$("#lista").append("<option value="+"1"+">Lista 1</option><option value="+"2"+">Lista2</option>");
			

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
		insertarCATALOGO(data);
		insertarNuevo(data);
  	}).fail(function() {
		alert ('fallo ');
	});
}
function obtenerLISTASUSUARIO(TOKEN,LOGIN)
{
	console.log(TOKEN);
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

