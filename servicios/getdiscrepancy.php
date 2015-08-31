<?php 
require_once('../accesodatos/catalogos.php');
	require_once('/../clases/subcontractor.php');
    header('Access-Control-Allow-Origin: *');
    
			if (isset($_GET['date']) & isset($_GET['date2']))
            	$sub = Catalogo :: Subcontractors($_GET['date'], ($_GET['date2']));
			else if (isset($_GET['date']))
            	$sub = Catalogo :: Subcontractors($_GET['date']);
			else
				echo '{ "status" : 1, "message" : "No data received." }';
				
	$json = '{"subcontractors" : [';
		    $primero =  true;
            foreach($sub as $su)
            {
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                            "id": '.$su->getId().',
                            "discrepancies" : [';
                                            $first = true;
                                 if (isset($_GET['date']) & isset($_GET['date2']))
                                 {
                                            foreach($su->getDiscrepancies($_GET['date'], $_GET['date2']) as $s)
                                            {
                                                if ($first) $first = false; else $json .=',';
                                                $json .= '{ 
                                                            "idDiscrepancy" : '.$s->getId().'
                                                          }';
                                            }
                                 }
                                else
                                {
                                     foreach($su->getDiscrepancies($_GET['date']) as $s)
                                            {
                                                if ($first) $first = false; else $json .=',';
                                                $json .= '{ 
                                                            "idDiscrepancy" : '.$s->getId().'
                                                          }';
                                            }
                                }
                                            $json .=']}';
            }
            $json .= ' ] }';
    
    echo $json;
 ?>
