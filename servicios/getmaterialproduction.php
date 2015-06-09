<?php 
	require_once('../accesodatos/catalogos.php');
	require_once('../clases/produced.php');
	require_once('../clases/delivery.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['model']))
        {
            $mat = Catalogo :: MateriaProduction($_GET['model']);
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($mat as $m)
            {
				$produced = new Produced();
				$delivered = new Delivery();
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                                    "id": '.$m->getId().',
                                    "number" : "'.$m->getNumber().'",
                                    "description" : "'.$m->getDescription().'",
                                    "qty" : '.$m->getQty().',
                                    "line" : "'.$m->getModelId()->getIdLine()->getDescription().'",
                                    "date" : "'.$m->getPoId()->getDate().'",
                                    "poId" : "'.$m->getPoId()->getId().'",
                                    "produced" : '.$produced->producedQty($m->getId()).',
									"delivered" : '.$delivered->deliveredQty($m->getId()).',';
                                    $max = $m->getQty() - $produced->producedQty($m->getId());
                
                                   $json .= ' "max" : '.$max.'
                            }';
            }
            $json .= ' ] }';
    }
    echo $json;
 ?>
