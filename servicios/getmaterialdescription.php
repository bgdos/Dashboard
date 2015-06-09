<?php 
	require_once('../accesodatos/catalogos.php');
	require_once('/../clases/material.php');
    header('Access-Control-Allow-Origin: *');
    
    
            $mat = Catalogo :: descriptionMaterial();
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($mat as $m)
            {
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
									"id": '.$m->getId().',
                                    "description": "'.$m->getDescription().'"
                            }';
            }
            $json .= ' ] }';
    
    echo $json;
 ?>
