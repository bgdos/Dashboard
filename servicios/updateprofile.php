<?php
    require_once('/../clases/user.php');
    header('Access-Control-Allow-Origin: *');

if (isset($_REQUEST['email']) && isset($_REQUEST['password'])) 
    {
        // variables
        $password = $_REQUEST['password'];
        $user = new User();
        $result = $user->updatePassword($_REQUEST['email'], $password);
	
		if($result == 1)
			echo '{"status" : 0, "message" : "Password succesfully saved"}';
		else
			echo '{"status" : 1, "message" : "Error on saving your password"}';  
    }
?>
