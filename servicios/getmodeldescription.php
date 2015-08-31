<?php 
	require_once('../accesodatos/catalogos.php');
	require_once('/../clases/model.php');
    header('Access-Control-Allow-Origin: *');

    date_default_timezone_set('America/Tijuana');
    $date = date('Y-m-d');
    $mm = new Model();
    $instruccion = "UPDATE model SET status_Id = 2 WHERE sdate <= '".$date."';";
    $mm->updateModelStatus($instruccion);
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
