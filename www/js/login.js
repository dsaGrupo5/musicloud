var API_BASE_URL = "http://127.0.0.1:8080/musicloud";
var USERNAME = "";
var PASSWORD = "";



$(document).ready(function() {
});

$("#login_in").click(function(e) 
{
	e.preventDefault();
	
	if($("#login").val() == "" || $("#password").val() == "" )
	{
	
		if($("#login").val() == "")
		{
			document.getElementById('login').style.background='#F6B5B5';
			$('#login').attr('placeholder','RELLENE EL CAMPO');
		}
		if($("#password").val() == "")
		{
			document.getElementById('password').style.background='#F6B5B5';
			$('#password').attr('placeholder','RELLENE EL CAMPO');
		}
	
	}
	else
	{
		
	var login = $("#login").val();
	var password = $("#password").val();	
	getlogin(login, password);
	
	}
	
});



function getlogin(login, password)
{ 	
	
	var url = API_BASE_URL + '/login/login_in';		
	$.post( url,{login: login,password : password}).done(function(data, status, jqxhr) //como se esta construyendo esta ruta?

		{
			if(data.role== 'registrado')
			{
				
				$.cookie('login', login);
				$.cookie('Iduser', data.Iduser);
				$.cookie('token', data.token);
				
			    window.location = "http://localhost/home_user.html" ;
			}
			if(data.role== 'administrador')
			{
				$.cookie('login', login);
				$.cookie('Iduser', data.Iduser);
				$.cookie('token', data.token);
				window.location = "http://localhost/home_admin.html" ;
			}
		})
	    .fail( function( jqXHR, textStatus, errorThrown )
		{ 
		//CAMBIAR EL COLOR
		alert ('ID o password incorrectos!');
			document.getElementById('userid').style.background='#F6B5B5';
			document.getElementById('userid').value=null;
			$('#userid').attr('placeholder','USUARIO NO REGISTRADO');
		});

}