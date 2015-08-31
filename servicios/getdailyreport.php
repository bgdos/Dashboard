<?php 
require_once('../accesodatos/catalogos.php');
	require_once('/../clases/produced.php');
	require_once('/../clases/delivery.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['date']) & isset($_GET['subcontractor']))
        {
            $subassy = Catalogo :: DailyReport($_GET['date'],$_GET['subcontractor']);
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($subassy as $sub)
            {
                $delivery = new Delivery($_GET['date'], $sub->getId());
                $produced = new Produced($_GET['date'], $sub->getId());
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                                    "subcontractor": "'.$sub->getPoId()->getSubcontractorId()->getName().'",
                                    "model" : '.$sub->getModelId()->getNumber().',
                                    "line" : "'.$sub->getModelId()->getIdLine()->getDescription().'",
                                    "sapNo" : "'.$sub->getNumber().'",
                                    "description" : "'.$sub->getDescription().'",
                                    "lot" : '.$sub->getModelId()->getLot().',
                                    "produced" : '.$produced->getDaily().',
                                    "delivered" : '.$delivery->getDaily().',
                                    "totalprod" : '.$produced->getSum().',
                                    "totaldeliv" : '.$delivery->getSum().'
                            }';
            }
            $json .= ' ] }';
    }
    echo $json;
 ?>
