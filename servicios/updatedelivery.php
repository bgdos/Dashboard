<?php 
	require_once('../clases/material.php');
	require_once('../clases/produced.php');
	require_once('../clases/delivery.php');
	header('Access-Control-Allow-Origin: *');
    if (isset($_POST['materials']))
	{
		 $materials = $_POST['materials'];
		if ($materials != null)
		{
			$instruccion ="";
			$d = new Delivery();
			for ($i = 0; $i < count($materials); $i++ )
			{
				$instruccion .= "update delivery set qty = ".$materials[$i]['qty']." where packing = '".$materials[$i]['packing']."';";
			
			}
			if ($d->SaveDelivery($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
