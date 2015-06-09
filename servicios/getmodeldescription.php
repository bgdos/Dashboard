<?php 
	require_once('../accesodatos/catalogos.php');
	require_once('/../clases/material.php');
    header('Access-Control-Allow-Origin: *');
    
    
            $mod = Catalogo :: descriptionModel();
            $json = '{"models" : [';
		    $primero =  true;
            foreach($mod as $m)
            {
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
									"id": '.$m->getId().',
                                    "number": '.$m->getNumber().',
									"line" : { "id": '.$m->getIdLine()->getId().',
                                    		   "description": "'.$m->getIdLine()->getDescription().'"}
                            }';
            }
            $json .= ' ] }';
    
    echo $json;
 ?>
