<?php 
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['po']))
        {
            $mat = Catalogo :: Delivery($_GET['po'], $_GET['sub']);
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($mat as $m)
            {
                $produced = new Produced();
				$delivered = new Delivery();
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                                    "id": '.$m->getId().',
                                    "poId" : "'.$m->getPoId()->getId().'",
                                    "number" : "'.$m->getNumber().'",
                                    "description" : "'.$m->getDescription().'",
                                    "qty" : '.$m->getQty().',
                                    "line" : "'.$m->getModelId()->getIdLine()->getDescription().'",
                                    "date" : "'.$m->getPoId()->getDate().'",
                                    "produced" : '.$produced->producedQty($m->getId()).',
									"delivered" : '.$delivered->deliveredQty($m->getId()).',';
                                    $max = $produced->producedQty($m->getId()) - $delivered->deliveredQty($m->getId());
                
                                   $json .= ' "max" : '.$max.'
                            }';
            }
            $json .= ' ] }';
    }
    echo $json;
 ?>
