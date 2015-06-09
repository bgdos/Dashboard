<?php 
require_once('../clases/model.php');
header('Access-Control-Allow-Origin: *');
    if (isset($_POST['models']))
	{
		 $ids = $_POST['models'];
		if ($ids != null)
		{
			$instruccion ="";
			$m = new Model();
			for ($i = 0; $i < count($ids); $i++ )
			{
				
				$instruccion .= "update model set status_Id = 3 where id = ".$ids[$i] .";";
			
			}
			if ($m->deleteSchedule($instruccion) === true)
				echo '{ "status" : 0, "message" : "Models deleted." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error" }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
