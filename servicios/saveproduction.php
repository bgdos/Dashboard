<?php 
  require_once('../clases/material.php');
  require_once('../clases/produced.php');
  header('Access-Control-Allow-Origin: *');
    if (isset($_POST['materials']))
	{
		 $materials = $_POST['materials'];
		if ($materials != null)
		{
			$instruccion ="";
			$p = new Produced();
			for ($i = 0; $i < count($materials); $i++ )
			{
				$m = new Material($materials[$i]['material']);
				$instruccion .= "INSERT INTO produced (qty, p_date, model_id, material_id)";
				$instruccion .= "values(". $materials[$i]['qty'] .", now(), ". $m->getModelId()->getId().", ". $materials[$i]['material'].")";
			
			}
			if ($p->SaveProduced($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
