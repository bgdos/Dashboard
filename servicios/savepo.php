<?php 
	require_once('../clases/material.php');
	header('Access-Control-Allow-Origin: *');
    if (isset($_POST['pos']))
	{
		$pos = $_POST['pos'];
        $error = false;
		if ($pos != null)
		{
            for ($i = 0; $i < count($pos); $i++)
            {
                $po1 = new Po($pos[$i]['po']);
                if ($po1->getSubcontractorId()->getId() > 0)
                {
                    if ($po1->getSubcontractorId()->getId() != $pos[$i]['subcontractor'])
                    {
                        echo '{ "status" : 3, "message" : "PO"'. $po1->getSubcontractorId()->getId() .'correspond for other vendor." }';
                        break;
                    }
                }
            }
            savepo($pos);
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';

function savepo($pos)
{
	$instruccion ="";
	$m = new Material();
    $p1 = 0;
	for ($i = 0; $i < count($pos); $i++ )
	{
		$po1 = new Po($pos[$i]['po']);
		if ($po1->getId() != $pos[$i]['po'])
		{
			if  ($p1 != $pos[$i]['po'])
            {
                $p1 = $pos[$i]['po'];
                $instruccion .= "INSERT INTO po (id, date, subcontractor_Id, status_Id)";
                $instruccion .= "VALUES(". $pos[$i]['po'] .", '". $pos[$i]['date'] ."', ". $pos[$i]['subcontractor'] .", 1);";
            }
		}
		else
			$instruccion .= "UPDATE po SET status_Id = 1 WHERE id = ".$pos[$i]['po'].';';
		$instruccion .= "INSERT INTO material (po_Id, number,description, qty, model_Id)";
		$instruccion .= "VALUES(". $pos[$i]['po'] .", '". $pos[$i]['sapnumber'] ."', '". $pos[$i]['description'] ."', ". $pos[$i]['qty']. ", ". $pos[$i]['model'].");";

	}
	if ($m->savePo($instruccion) === true)
		echo '{ "status" : 0, "message" : "Data saved successfully." }';
	
}
?>
