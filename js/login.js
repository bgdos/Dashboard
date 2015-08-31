/**
 * Production Dashboard
 *
 * @version 1 (06. 23 June 2015)
 * @authors Fausto Serrano & Juan Salgado
 * @requires jQuery, progress, highcharts, jquery.datatables, tooltipster, weather widget (http://www.theweather.com/)
 * 
 *
 * 
 * 
 */
//variables
var urlServer = 'http://localhost:8080/production_dashboard/';
var urlToken = 'servicios/gettoken.php';
var urlUser = 'servicios/getuser.php';

var token ='';
var x = new XMLHttpRequest();


function obtenerToken()
{
    var txt1 = document.getElementById('loginmail');
    var txt2 = document.getElementById('loginpassword');
    if (txt1.value == "")
	{
		tooltip('#loginmail', "Please enter your email", 'right');
		$('#loginmail').tooltipster('show');
	}
    else
	{ try {$('#loginmail').tooltipster('destroy');}catch(err){"";}}
    if (txt2.value == "")
	{
		tooltip('#loginpassword', "Please enter your password", 'right');
		$('#loginpassword').tooltipster('show');
	}
    else
	{try {$('#loginpassword').tooltipster('destroy')}catch(err){"";}}
    if (txt1.value != null & txt2.value != null)
    {
        if(window.FormData == undefined) {
           obtenerTokenIE();
        } 
        else {
            obtenerTokenNotIE(); 
        }
    }
}
function obtenerTokenIE()
{
    console.log('Obteniendo Token...');	
    var datos =  '?user='+ document.getElementById('loginmail').value + '&password=' + document.getElementById('loginpassword').value;
     var url = urlServer + urlToken + datos;
    //prepara peticion
    x.open('POST',url, true);
    //evento
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            console.log(respuestaJSON);
            //validar respuesta
            if (respuestaJSON.status == 0)
                {
                    try {
                        sessionStorage.id = respuestaJSON.id;
                        sessionStorage.email = respuestaJSON.email;
                        sessionStorage.username = respuestaJSON.name;
                        sessionStorage.userlastname = respuestaJSON.lastname;
                        sessionStorage.type = respuestaJSON.type;
                        sessionStorage.subcontractor = respuestaJSON.subcontractor;
                        sessionStorage.token = respuestaJSON.token;

                        if (sessionStorage.id != null)
                        {
                            window.location = 'main.html';
                        }
                    }
                    catch(err){
                        popInfo('Session Error', 'Please enable the cookies on your browser to access this site. <br> <b>Go to:</b> <br>Settings &#10141 Privacy & secuirity &#10141 Cookies &#10141 Allow / Enable');
                    }
                }
            else
                {
                    tooltip('#frmLogin', "Wrong email or password: Please try again");
                    $('#frmLogin').tooltipster('show');
                }
        }
    }		
    //enviar datos
    x.send();
}
function obtenerTokenNotIE()
{    
    console.log('Obteniendo Token...');	
    var url = urlServer + urlToken;
    var datos = new FormData(document.getElementById('frmLogin'));  
    x.open('POST',url, true);
    //evento
    x.onreadystatechange = function()
    {
        if (x.status == 200 & x.readyState == 4)
        {
            var respuesta = x.responseText;
            //parsear a JSON
            var respuestaJSON = JSON.parse(respuesta);
            console.log(respuestaJSON);
            //validar respuesta
            if (respuestaJSON.status == 0)
                {
                    try {
                        sessionStorage.id = respuestaJSON.id;
                        sessionStorage.email = respuestaJSON.email;
                        sessionStorage.username = respuestaJSON.name;
                        sessionStorage.userlastname = respuestaJSON.lastname;
                        sessionStorage.type = respuestaJSON.type;
                        sessionStorage.subcontractor = respuestaJSON.subcontractor;
                        sessionStorage.token = respuestaJSON.token;

                        if (sessionStorage.id != null)
                        {
                            window.location = 'main.html';
                        }
                    }
                    catch(err){
                        popInfo('Session Error', 'Please enable the cookies on your browser to access this site. <br> <b>Go to:</b> <br>Settings &#10141 Privacy & secuirity &#10141 Cookies &#10141 Allow / Enable');
                    }
                }
            else
                {
                    tooltip('#frmLogin', "Wrong email or password: Please try again");
                    $('#frmLogin').tooltipster('show');
                }
        }
    }		
    //enviar datos
    x.send(datos);
}
function validarUsuario()
{
    if (sessionStorage.type != null)
    {
		if (window.location == urlServer + 'adminht.html')
		{
			if(sessionStorage.type == 1)
			{
				document.getElementById('li-schedule').style.display = 'inline';	
				document.getElementById('li-delivery').style.display = 'inline';
				document.getElementById('li-production').style.display = 'inline';	
				document.getElementById('li-delivery').style.display = 'inline';
				document.getElementById('li-po').style.display = 'inline';	
				document.getElementById('li-receiving').style.display = 'inline';
				document.getElementById('li-user').style.display = 'inline';	
			}
			if(sessionStorage.type == 2)
			{
				document.getElementById('li-schedule').style.display = 'inline';	
				document.getElementById('li-receiving').style.display = 'inline';	
			}
			if(sessionStorage.type == 3)
			{
				document.getElementById('li-po').style.display = 'inline';	
				document.getElementById('li-production').style.display = 'inline';	
				document.getElementById('li-delivery').style.display = 'inline';	
			}
		}
		if(sessionStorage.type != 4)
        {
			document.getElementById('menuAdmin').style.display = 'inline';
        }
    }
    else 
        window.location = 'index.html';
}
function cerrarSesion()
{
    sessionStorage.clear();
    if(sessionStorage.id != '')
    {
        window.location = 'index.html';
    }
    else
    {
        console.log('no session');
    }
}
