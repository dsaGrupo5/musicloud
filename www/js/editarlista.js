var API_BASE_URL = "http://127.0.0.1:8080/musicloud";  //local
//var API_BASE_URL = "http://147.83.7.205:9090/musicloud";  //produccion
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";
var IDUSER= "";
var IDLISTA= "";
var CANCIONES= "";
//REVISAR USO DE LOS TOKEN O COOCKIES. HA DE RESPETAR LOS ROLES

$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	IDUSER = $.cookie('iduser');
	IDLISTA = $.cookie('idlista');
	
	obtenerLISTACANCIONESUSUARIO(TOKEN,IDLISTA);
	
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

$("body").on("click","#botoneliminar",function(event)
{
	        event.preventDefault();      
		   
		    var id="";
			var nombres = new Array(8);
			var valores="";
            // Obtenemos todos los valores contenidos en los <td> de la fila
            // seleccionada
            $(this).parents("tr").find("td").each(function(){valores+=$(this).html()+"\n";});
			var nombres = valores.split("\n");
            console.log(nombres);
			id= nombres[4];	
			console.log(id);
			var temitas = CANCIONES.canciones;
			var res='0';
			$.each(temitas.canciones,function(i, v)
			{
				var cancion = v;
				
					console.log(cancion.id);
				if(cancion.id==id)
				{
					alert('ok');
					res= i;
				}
			})
			
			CANCIONES.canciones.canciones.splice(res,1);
			//delete CANCIONES.canciones.canciones[res];
			
			
			console.log(CANCIONES);
            
			modificarlista(CANCIONES, TOKEN, IDLISTA);			
			
			
});









function insertarCATALOGO(data)
{
	$("#catalogo").find("tr:gt(0)").remove();
	var canciones = data.canciones.canciones;
		$.each(canciones, function(i, v)
		{
			var cancion= v; 
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +cancion.artista+
								  "</td><td data-th="+"nombre"  +">" +cancion.nombre +
								  "</td><td data-th="+"genero"  +">" +cancion.genero +
								  "</td><td data-th="+"url"  +" style="+"display:none"+">"+cancion.url +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">"+cancion.id+
								  "</td><td data-th="+"eliminar"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneliminar\"><span class=\"fa fa-close\"></span></button></td></tr>"
								 );
		    
		}) 
			
			
			

}

function obtenerLISTACANCIONESUSUARIO(TOKEN,IDLISTA)
{	
	var url = API_BASE_URL + '/cancion/obtener_listausuario/'+IDLISTA;
	$.ajax({
		url : url,
		type : 'GET',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		insertarCATALOGO(data);
		CANCIONES = data;
		console.log(data);
		
  	}).fail(function() {
		alert ('fallo ');
	});
}

function modificarlista(CANCIONES, TOKEN, IDLISTA){
	var data = JSON.stringify(CANCIONES);
	console.log(data);
	var url = API_BASE_URL + '/cancion/editar_listareproduccion/'+IDLISTA;

	$.ajax({
		url : url,
		type : 'PUT',
		data : data,
		dataType : 'json',
		contentType : 'application/vnd.dsa.musicloud.lista_usuario+json',
		headers: {"X-Auth-Token":TOKEN}
	}).done(function(data, status, jqxhr) {
		insertarCATALOGO(data);
				
		
  	}).fail(function() {
		alert ('fallo ');
	});
	
	
	
}



