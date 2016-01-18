//var API_BASE_URL = "http://127.0.0.1:8080/musicloud";  //local
var API_BASE_URL = "http://147.83.7.205:9090/musicloud";  //produccion
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";
var lastFilename;
var cancioncoleccion="";
var MAX ="";


$(document).ready(function() {
	LOGIN = $.cookie('login');
	TOKEN = $.cookie('token');
	MAX2= 0;
	VIST= 0;
	$.cookie('vist', VIST);
	$.cookie('max', MAX2);
	obtenerCATALOGO(TOKEN);
});

$("#log_out").click(function(e){
	e.preventDefault();
	var objetoLogout = new Object();
	objetoLogout.login = LOGIN;
	getlogout(objetoLogout, TOKEN);
	
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
			
			var formData = new FormData();
			
			formData.append("file", nuevaCancion.file);
			formData.append("artista", nuevaCancion.artista);
			formData.append("nombre", nuevaCancion.nombre);
			formData.append("genero", nuevaCancion.genero);
			
			cargar_cancion(formData, TOKEN);	
		}
	
	}
	
	
});

$("body").on("click","#botoneliminar",function(event)
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
			id= nombres[3];
            
			eliminarCancion(id, TOKEN);
			
			
			
			
      });

function cargar_cancion(formData,TOKEN){
	
	$('progress').toggle();	
	
	console.log(formData);
	var url = API_BASE_URL + '/cancion/cargarcancion';
	
	$.ajax({
		url: url,
		type: 'POST',
		CrossDomain : true,
		data: formData,
		headers: {"X-Auth-Token":TOKEN},
		cache: false,
		contentType: false,
        processData: false
	})
	.done(TOKEN,function (data, status, jqxhr) {
		
		document.getElementById('artista').value=null;
		document.getElementById('nombrecancion').value=null;
		document.getElementById('genero').value='Otros';
		document.getElementById('cancion').value=null;
		document.getElementById('fileSize').value=null;
		document.getElementById('fileType').value=null;
		
		
		document.getElementById('artista').style.background='#FFFFFF';
		document.getElementById('nombrecancion').style.background='#FFFFFF';
		document.getElementById('genero').style.background='#FFFFFF';
		
		$('#artista').attr('placeholder',null);
		$('#nombrecancion').attr('placeholder',null);
		$('#genero').attr('placeholder',null);
		var  MAX2= 0;
		var  VIST= 0;
		$.cookie('max', MAX2);
		$.cookie('vist', VIST);
					
		obtenerCATALOGO(TOKEN);	
		
		
		alert("Archivo subido correctamente!");
		$('progress').toggle();
		
	})
	 .fail(function (jqXHR, textStatus, errorThrown) {
    	alert("Esta cancion ya existe en la base de datos");		
		$('progress').toggle();
	
	
});
}

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
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
		alert ('logout fail!');
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
			
		
		while(i<6 && mm<tam)
		{
			
			
			$("#catalogo").append("<tr><td data-th=" +"artista" +">" +canciones[mm].artista+
								  "</td><td data-th="+"nombre"  +">" +canciones[mm].nombre +
								  "</td><td data-th="+"genero"  +">" +canciones[mm].genero +
								  "</td><td data-th="+"id"  +" style="+"display:none"+">" +canciones[mm].id +
								  "</td><td data-th="+"url"  +" style="+"display:none"+">" +canciones[mm].url +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneliminar\"><span class=\"fa fa-times\"></span></button></td></tr>"
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
								  "</td><td data-th="+"id"  +" style="+"display:none"+">" +canciones[mm].id +
								  "</td><td data-th="+"url"  +" style="+"display:none"+">" +canciones[mm].url +
								  "</td><td data-th="+"acciones"+"><button type=\"button\"class=\"btn btn-xs btn-default command-edit\" id=\"botoneliminar\"><span class=\"fa fa-times\"></span></button></td></tr>"
								 );
								mm++;
								 
		    
		}
		VIST=VIST-6;
		console.log('POSICION ARRAY= '+mm);
		console.log(' vist = :'+VIST);
		$.cookie('max', mm);
		$.cookie('vist', VIST);
			

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
		var tam = data.canciones.length;		
		$.cookie('tam', tam);		
		insertarCATALOGO(data);
		cancioncoleccion = data;
		
 	}).fail(function() {
		alert ('fallo ');
	});
}

function eliminarCancion(id, TOKEN) 
{
	var url = API_BASE_URL + '/cancion/eliminarcancion/'+ id;
	$.ajax({
		url : url,
		type : 'DELETE',
		headers: {"X-Auth-Token":TOKEN} 
	}).done(TOKEN,function(data, status, jqxhr) {
		var  MAX2= 0;
		var  VIST= 0;
		$.cookie('max', MAX2);
		$.cookie('vist', VIST);
		obtenerCATALOGO(TOKEN);	
		
		
  	}).fail(function() {
		alert ('Fallo al eliminar canción!');
	});

}
	



