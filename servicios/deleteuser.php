<?php 
require_once('../clases/user.php');
header('Access-Control-Allow-Origin: *');
    if (isset($_GET['id']))
	{
		 $id = $_GET['id'];
		if ($id != null)
		{
			$m = new User();
			if ($m->deleteUser($id) === true)
				echo '{ "status" : 0, "message" : "User deleted." }';
			else
				echo '{ "status" : 3, "message" : "You can&#39;t delete this user." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error deleting user" }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
