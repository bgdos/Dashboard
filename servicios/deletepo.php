<?php 
require_once('../clases/material.php');
header('Access-Control-Allow-Origin: *');
    if (isset($_GET['id']))
	{
		 $id = $_GET['id'];
		if ($id != null)
		{
			$m = new Material();
			if ($m->deletePo($id) === true)
				echo '{ "status" : 0, "message" : "PO / Material deleted." }';
			else
				echo '{ "status" : 3, "message" : "Material records found on produced, you can&#39;t delete this material." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error deleting PO / material" }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
