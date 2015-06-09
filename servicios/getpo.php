<?php 
	require_once('../clases/po.php');
	require_once('../clases/produced.php');
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');
	$json = '{"po" : [';
    if (isset($_GET['idPo']))
       {
            $po = Catalogo::PurchaseOrders($_GET['idPo']);
		    $mod = Catalogo :: descriptionModel();
			if ($po != null)
			{
				$primero =  true;
				foreach($po as $p)
				{
					$produced = new Produced();
					if (!$primero) $json .= ','; else $primero = false;
					$json .= '	{ 
										"status" : 0,
										"id" : '.$_GET['idPo'].',
										"materialId" : '.$p->getId().',
										"material" : "'.$p->getNumber().'",
										"description" : "'.$p->getDescription().'",
										"qty" : '.$p->getQty().',
										"produced" : '.$produced->producedQty($p->getId()).',
										"modelId" : '.$p->getModelId()->getId().',
										"model" : '.$p->getModelId()->getNumber().',
										"line" : "'.$p->getModelId()->getIdLine()->getDescription().'",
										"date" : "'.$p->getPoId()->getDate().'",
										"subcontractor" : '.$p->getPoId()->getSubcontractorId()->getId().',
										"models" : [';																														
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
            $json .= ' ]

								}';
				}
				$json .= ' ] }';
				echo $json;
			}
			else
				{
				$json .= '{ "status" : 1, "message": "PO not found"} ] }';
				echo $json;
			}
				
	
		}
	else
		echo '{ "status" : 2, "message": "Parameter not received"}';
 ?>
