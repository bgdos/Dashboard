<?php 
	require_once('../clases/material.php');
	require_once('../clases/produced.php');
	require_once('../clases/delivery.php');
	header('Access-Control-Allow-Origin: *');
    date_default_timezone_set('America/Tijuana');
    $date = date('Y-m-d');
    if (isset($_POST['materials']))
	{
		$materials = $_POST['materials'];
        $error = false;
		if ($materials != null)
		{
            $d = new Delivery();
			$instruccion ="";
            for ($i = 0; $i < count($materials); $i++ )
            {
                $d = new Delivery($materials[$i]['packing']);
                if ($d->getId() > 0)
                {
                    echo '{ "status" : 0, "message" : "Packing list '.$materials[$i]['packing'].' already exist." }';
                    $error = true;
                }
                else{
                    $m = new Material($materials[$i]['material']);
                    $instruccion .= "INSERT INTO delivery (qty, d_date, model_id, material_id, packing, statusId)";
                    $instruccion .= "values(". $materials[$i]['qty'] .", '".$date."', ". $m->getModelId()->getId().", ". $materials[$i]['material'].", '".$materials[$i]['packing']."',1);";
                    
                }
            }
            if ($error == false)
                {
                if ($d->SaveDelivery($instruccion) === true)
				        echo '{ "status" : 0, "message" : "Data saved successfully." }';
            }
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
?>
