<?php
	function generarToken()
	{
		//token
		$token = '';
		//generar token
		$zona = 'America/Tijuana';//zona horaria
		date_default_timezone_set($zona);//asignar zona horaria
		$hoy = new DateTime();//crear fecha
		//recibir argumentos
		$argumentos = func_get_args();
		//1 arguemnto es el usuario
		if (func_num_args()==1)
		{
			//concatenar usuario y fecha
			$token = sha1($argumentos[0].(date_format($hoy,'Ymd')));
		}
		//regresar token
		return $token;
	}
?>
