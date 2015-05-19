<?php 
	require_once('/../clases/schedule.php');
  require_once('/../clases/material.php');
  require_once('/../clases/delivery.php');
  require_once('../accesodatos/catalogos.php');
  header('Access-Control-Allow-Origin: *');
    

    if (isset($_GET['line']) & isset($_GET['date']))
	{
		$sche = Catalogo::Schedules($_GET['line'], $_GET['date']);
        $mat = new Material();
		$json = '{"models" : [';
		$primero =  true;
		foreach($sche as $mod)
		{
            $delivery = new Delivery($mod->getModelId()->getId(), $_GET['date']);
			if (!$primero) $json .= ','; else $primero = false;
			$json .= '	{ 
                                "id": '.$mod->getModelId()->getId().',
                                "number" : '.$mod->getModelId()->getNumber().',
                                "owner" : "'.$mod->getModelId()->getOwner().'",
                                "lot" : "'.$mod->getModelId()->getLot().'",
                                "startDate" : "'.$mod->getModelId()->getStartDate().'",
                                "line" : '.$mod->getLineId()->getId().',
                                "totalQty" : '.$mat->getTotalQty($mod->getModelId()->getId()).',
                                "totalDelivery" : '.$delivery->getSum().',';
                                if ($mat->getTotalQty($mod->getModelId()->getId()) > 0)
                                    {
                                    $json .= '"percent" : '.(100/$mat->getTotalQty($mod->getModelId()->getId()))*$delivery->getSum().'
						}';
                                }
                                else
                                    {
                                    $json .= '"percent" : 0
						}';
                                }
		}
		$json .= ' ] }';
		echo $json;
	}
    else if (isset($_GET['date']))
    {
        $sche = Catalogo::Schedules( $_GET['date']);
        $json = '{"models" : [';
		$primero =  true;
		foreach($sche as $mod)
		{
			if (!$primero) $json .= ','; else $primero = false;
			$json .= '	{ 
                                "id": '.$mod->getModelId()->getId().',
                                "number" : '.$mod->getModelId()->getNumber().',
                                "owner" : "'.$mod->getModelId()->getOwner().'",
                                "lot" : "'.$mod->getModelId()->getLot().'",
                                "startDate" : '.$mod->getModelId()->getStartDate().',
                                "line" : '.$mod->getLineId()->getId().'
						}';
		}
		$json .= ' ] }';
		echo $json;
    }

 ?>



