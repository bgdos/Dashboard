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
				$instruccion .= "INSERT INTO po (id, date, subcontractor_Id, status_Id)";
				$instruccion .= "VALUES(". $pos[$i]['po'] .", '". $pos[$i]['date'] ."', ". $pos[$i]['subcontractor'] .", 1);";
				$instruccion .= "INSERT INTO material (po_Id, number,description, qty, model_Id)";
				$instruccion .= "VALUES(". $pos[$i]['po'] .", ". $pos[$i]['sapnumber'] .", '". $pos[$i]['description'] ."', ". $pos[$i]['qty']. ", ". $pos[$i]['model'].");";
			
			}
			if ($m->savePo($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
?>
