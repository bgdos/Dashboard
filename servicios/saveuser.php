<?php 
	require_once('../clases/user.php');
	header('Access-Control-Allow-Origin: *');
    if (isset($_POST['users']))
	{
		 $user = $_POST['users'];
		if ($user != null)
		{
			$instruccion ="";
			$u = new User();
				if ($user[0]['subcontractor'] != null)
                {
                    $instruccion .= "INSERT INTO users (email, password,name, lastname, type_Id, subcontractor_Id)";
                    $instruccion .= "values('".$user[0]['email']."',SHA1('".$user[0]['password']."'), '".$user[0]['name']."','".$user[0]['lastname']."',".$user[0]['typeId'].",".$user[0]['subcontractor'].");";
                }
                else if ($user[0]['subcontractor'] == null)
                {
                    $instruccion .= "INSERT INTO users (email, password,name, lastname, type_Id)";
                    $instruccion .= "values('".$user[0]['email']."',SHA1('".$user[0]['password']."'), '".($user[0]['name'])."','".($user[0]['lastname'])."',".$user[0]['typeId'].");";
                }
			
			
			if ($u->addUser($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data added successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
?>
