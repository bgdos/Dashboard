<?php 
	require_once('../clases/model.php');
	header('Access-Control-Allow-Origin: *');
    if (isset($_POST['models']))
	{
		 $model = $_POST['models'];
		if ($model != null)
		{
			$instruccion ="";
			$m = new Model();
			for ($i = 0; $i < count($model); $i++ )
			{
				
				$instruccion .= "INSERT INTO model (line_id, number,owner, lot, sdate, status_id)";
				$instruccion .= "values(". $model[$i]['line'] .", ". $model[$i]['model'] .", '". $model[$i]['owner'] ."', ". $model[$i]['lot']. ", '". $model[$i]['date']."', 1);";
			
			}
			if ($m->saveSchedule($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
		}
		else
			echo '{ "status" : 1	, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
