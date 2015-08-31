<?php 
	require_once('../clases/model.php');
	header('Access-Control-Allow-Origin: *');
    date_default_timezone_set('America/Tijuana');
    $date = date('Y-m-d');
    $status = 0;
    if (isset($_POST['models']))
	{
		 $models = $_POST['models'];
		if ($models != null)
		{
			$instruccion ="";
			$m = new Model();
			for ($i = 0; $i < count($models); $i++ )
			{
				
                if ($date >= $models[$i]['date'])
                    $status = 2;
                else
                    $status = 1;
                $instruccion .= "update model set number = ".$models[$i]['model'] .",  owner = '".$models[$i]['owner']."',  lot = ".$models[$i]['lot'].",  sdate = '".$models[$i]['date']."', line_id =".$models[$i]['line'].", status_id =". $status ." where id = ".$models[$i]['id'].";";
			
			}
			if ($m->editSchedule($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data updated successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
