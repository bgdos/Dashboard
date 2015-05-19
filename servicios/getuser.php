<?php 
	require_once('../clases/user.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['user']))
        {
            $user =  new User($_GET['user']);
            $json = '{ 
                    "id": "'.$_GET['user'].'",
                    "email" : "'.$user->getEmail().'",
                    "name" : "'.$user->getName().'",
                    "lastname" : "'.$user->getLastName().'",
                    "type" : '.$user->getTypeId()->getId().'
            }';
        }
    echo $json;
 ?>
