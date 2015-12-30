var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var LOGIN = "";
var PASSWORD = "";
var TOKEN = "";
var url= "";
var lastFilename;



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
			
			var formData = new FormData();
			
			formData.append("file", nuevaCancion.file);
			formData.append("artista", nuevaCancion.artista);
			formData.append("nombre", nuevaCancion.nombre);
			formData.append("genero", nuevaCancion.genero);
			
			cargar_cancion(formData, TOKEN);	
		}
	
	}
	
	
});



/*function cargar_cancionuno(nuevaCancion,TOKEN) 
{
	
	var data = JSON.stringify(nuevaCancion);
	//var data = nuevaCancion;
	
	var url = API_BASE_URL + '/cancion/cargarcancion';
	    $.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,		
		contentType : 'multipart/form-data',
		//contentType : 'application/vnd.dsa.musicloud.cancion+json',
		data : data,
		headers: {"X-Auth-Token":TOKEN},		
	}).done(function(data, status, jqxhr){
		alert ('Canción disponible en servidor!');
		//window.location = "http://localhost/home_admin.html" ;	
	}).fail(function(){
		alert ('Error en al subir canción!');
	});
}*/

function cargar_cancion(formData,TOKEN){
	
	$('progress').toggle();	
	
	console.log(formData);
	var url = API_BASE_URL + '/cancion/cargarcancion';
	
	$.ajax({
		url: url,
		type: 'POST',
		/*xhr: function() {  
	    	var myXhr = $.ajaxSettings.xhr();
	        if(myXhr.upload){ 
	            myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
	        }
	        return myXhr;
        },*/
		crossDomain : true,
		data: formData,
		headers: {"X-Auth-Token":TOKEN},
		cache: false,
		contentType: false,
        processData: false
	})
	.done(function (data, status, jqxhr) {
		/*var response = $.parseJSON(jqxhr.nuevaCancion);
		lastFilename = response.cancion;
		
		$('#uploadedImage').attr('src', response.imageURL);
		
		$('nuevaCancion')[0].reset();*/
		console.log(data);
		//alert("Archivo subido correctamente!");
		$('progress').toggle();
		//window.location = "http://localhost/gestion_listas.html" ;	
	})
	 .fail(function (jqXHR, textStatus, errorThrown) {
    	alert("KO");
		console.log(textStatus);
		if (jqXHR.status === 0) {
    
            alert('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

            alert('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

            alert('Time out error.');

        } else if (textStatus === 'abort') {

            alert('Ajax request aborted.');

        } else {

            alert('Uncaught Error: ' + jqXHR.responseText);

		}
	
	
	
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

