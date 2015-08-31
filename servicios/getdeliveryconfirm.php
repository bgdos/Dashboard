<?php 
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['packing']))
        {
            $mat = Catalogo :: DeliveryConfirm($_GET['packing']);
            $json = '{"materials" : [';
		    $primero =  true;
            foreach($mat as $m)
            {
                $produced = new Produced();
                if (!$primero) $json .= ','; else $primero = false;
                $json .= '	{ 
                                    "idMaterial": '.$m->getMaterialId()->getId().',
                                    "subcontractor": "'.$m->getMaterialId()->getPoId()->getSubcontractorId()->getName().'",
									"subcontractorId": "'.$m->getMaterialId()->getPoId()->getSubcontractorId()->getId().'",
                                    "poId" : '.$m->getMaterialId()->getPoId()->getId().',
                                    "number" : "'.$m->getMaterialId()->getNumber().'",
									"packingId" : "'.$m->getId().'",
                                    "packing" : "'.$m->getPacking().'",
									"packingQty" : '.$m->getQty().',
                                    "description" : "'.$m->getMaterialId()->getDescription().'",
                                    "qty" : '.$m->getMaterialId()->getQty().',
                                    "line" : "'.$m->getMaterialId()->getModelId()->getIdLine()->getDescription().'",
                                    "date" : "'.$m->getPDate().'",
                                    "produced" : '.$produced->producedQty($m->getMaterialId()->getId()).',
                                    "devqty" : '.$m->deliveredQty($m->getMaterialId()->getId()).',';
                                     $max = $produced->producedQty($m->getMaterialId()->getId()) - $m->deliveredQty($m->getMaterialId()->getId());
                
                                   $json .= ' "maxd" : '.$max.'
                            }';
            }
            $json .= ' ] }';
    }
    echo $json;
 ?>
