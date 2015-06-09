<?php 
require_once('../accesodatos/catalogos.php');
	require_once('/../clases/material.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['idModel']) & isset($_GET['material']))
        {
            $subassy = Catalogo :: Materials($_GET['idModel'],$_GET['material']);
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($subassy as $sub)
            {
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                                    "vendor": "'.$sub->getPoId()->getSubcontractorId()->getName().'",
                                    "po" : '.$sub->getPoId()->getId().',
                                    "sapNo" : "'.$sub->getNumber().'",
                                    "description" : "'.$sub->getDescription().'",
                                    "qty" : '.$sub->getQty().'
                            }';
            }
            $json .= ' ] }';
    }
    echo $json;
 ?>
