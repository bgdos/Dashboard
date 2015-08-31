<?php 
	require_once('../clases/material.php');
	header('Access-Control-Allow-Origin: *');
    if (isset($_POST['pos']))
	{
		 $pos = $_POST['pos'];
		if ($pos != null)
		{
			$instruccion ="";
			$m = new Material();
			for ($i = 0; $i < count($pos); $i++ )
			{
				$instruccion .= "update material set number = '".$pos[$i]['number'] ."',  qty = ".$pos[$i]['qty'].",  model_Id = ".$pos[$i]['model']." where id = ".$pos[$i]['id'].";";
			}
			if ($m->editPo($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data updated successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
