<?php 
	require_once('../clases/user.php');
	header('Access-Control-Allow-Origin: *');

    if (isset($_POST['user']))
	{
		 $user = $_POST['user'];
		if ($user != null)
		{
			$instruccion ="";
			$u = new User();
            
            if ($user[0]['password'] != null)
            {
				$instruccion .= "update users set email = '".$user[0]['email2'] ."',  password = SHA1( '".$user[0]['password']."'),  name = '".$user[0]['name']."', lastname = '".$user[0]['lastname']."', type_Id = ".$user[0]['typeId'].", subcontractor_Id = ".$user[0]['subcontractor']." where email = '".$user[0]['email']."';";
            }
            else
            {
                	$instruccion .= "update users set email = '".$user[0]['email2'] ."',  name = '".$user[0]['name']."', lastname = '".$user[0]['lastname']."', type_Id = ".$user[0]['typeId'].", subcontractor_Id = ".$user[0]['subcontractor']." where email = '".$user[0]['email']."';";
            }
			
			
			if ($u->editUser($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data updated successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
