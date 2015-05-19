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
        document.getElementById('lbl1').style.display = 'inline';
    else
        document.getElementById('lbl1').style.display = 'none';
    if (txt2.value == "")
        document.getElementById('lbl2').style.display = 'inline';
    else
        document.getElementById('lbl2').style.display = 'none';
    if (txt1.value != null & txt2.value != null)
    {
        console.log('Obteniendo Token...');	
        var url = urlServer + urlToken;
        //prepara peticion
        x.open('POST',url, true);
        var datos = new FormData(document.getElementById('frmLogin'));
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
                        sessionStorage.id = respuestaJSON.id;
                        sessionStorage.email = respuestaJSON.email;
                        sessionStorage.username = respuestaJSON.name;
                        sessionStorage.userlastname = respuestaJSON.lastname;
                        sessionStorage.type = respuestaJSON.type;
                        sessionStorage.token = respuestaJSON.token;

                        if (sessionStorage.id != null)
                        {
                            window.location = 'main.html';
                        }
                    }
                else
                    {
                        document.getElementById('error-login').innerHTML = "Error: Please try again";
                    }
            }
        }	
        //enviar datos
        x.send(datos);
    }
}
function validarUsuario()
{
    if (sessionStorage.type != null)
    {
        if(sessionStorage.type == 1)
        {
            document.getElementById('menuAdmin').style.display = 'none';
        }
        if(sessionStorage.type == 2)
        {
        }
        if(sessionStorage.type == 3)
        {
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
function validaremail()
{
    //tooltip('#loginmail', 'Please enter your email');
}
