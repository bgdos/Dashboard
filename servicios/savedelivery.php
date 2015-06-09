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
				$m = new Material($materials[$i]['material']);
				$instruccion .= "INSERT INTO delivery (qty, d_date, model_id, material_id, packing, statusId)";
				$instruccion .= "values(". $materials[$i]['qty'] .", now(), ". $m->getModelId()->getId().", ". $materials[$i]['material'].", '".$materials[$i]['packing']."',1)";
			
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
