<?php
	//iniciar sesion
    header('Content-Type: text/html; charset=utf-8');
	session_start();
	//permitir acceso al servicio
	header('Access-Control-Allow-Origin: *');
	//utilizar archivos
    require_once('/../clases/user.php');
	require_once('generartoken.php');
	//recibir los valores
	if (isset($_POST['user'])&isset($_POST['password']))
	{
		//pasar parametros a variables
        $email = $_POST['user'];
		$password = $_POST['password'];
		//crear usuario
        $user = new User($email, $password);
		//verificar si usuario existe
		if ($user->getId() != '')
		{
			//grabar usuario
			$_SESSION['user'] = $user->getId();
            $token = generarToken($user->getId());
			//desplegar datos del usuario
            if (isset($token))
            {
                $json = '{ 
                    "status":0,
                    "id": '.$user->getId().',
                    "email" : "'.$user->getEmail().'",
                    "name" : "'.$user->getName().'",
                    "lastname" : "'.$user->getLastName().'",
                    "type" : '.$user->getTypeId()->getId().',
                    "token" : "'.$token.'"
                }';
                echo $json;
            }
                
		}
		else{
		  echo '{"status":1, "error":"Acceso denegado"}';}
	}
	else
		echo '{"status":2", error":"Parametros incompletos"}';

	
	
?>
