<?php 
	require_once('../clases/delivery.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['idModel']) & isset($_GET['date']))
        {
            $status =  new Delivery($_GET['idModel'],$_GET['date'] );
            $json = '{ 
                    "idMaterial": '.$status->$materialId()->getId().',
                    "description": "'.$status->$materialId()->getDescription().'",
                    "daily": '.$status->getDaily().',
                    "sum" : '.$status->getSum().'
            }';
        }
    echo $json;
 ?>
