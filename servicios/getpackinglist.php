<?php 
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');
    
    $del = Catalogo :: PackingList();
    if (count($del) > 0)
    {
        $json = '{  "status" : 1,
                "packings" : [';
        $primero =  true;
        foreach($del as $d)
        {
            if (!$primero) $json .= ','; else $primero = false;
            $json .= '	{
                                "id": '.$d->getId().',
                                "packing" : "'.$d->getPacking().'"
                        }';
        }
        $json .= ' ] }';
        echo $json;
    }
    else echo '{ "status" : 0 }';
?>
