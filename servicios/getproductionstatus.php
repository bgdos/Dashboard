<?php 
	require_once('../clases/produced.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['idModel']) & isset($_GET['date']))
        {
            $status =  new Produced($_GET['idModel'],$_GET['date'] );
            $json = '{ 
                    "daily": '.$status->getDaily().',
                    "sum" : '.$status->getSum().'
            }';
        }
    echo $json;
 ?>
