<?php 
	require_once('../clases/schedule.php');
	require_once('../clases/material.php');
    require_once('../clases/delivery.php');
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
            $delivery = new Delivery($mod->getId(), $_GET['date']);
			if (!$primero) $json .= ','; else $primero = false;
			$json .= '	{ 
                                "id": '.$mod->getId().',
                                "number" : '.$mod->getNumber().',
                                "owner" : "'.$mod->getOwner().'",
                                "lot" : "'.$mod->getLot().'",
                                "startDate" : "'.$mod->getStartDate().'",
								"lineId" : "'.$mod->getIdLine()->getId().'",
                                "line" : "'.$mod->getIdLine()->getDescription().'",
                                "totalQty" : '.$mat->getTotalQty($mod->getId()).',
                                "totalDelivery" : '.$delivery->getSum().',';
                                if ($mat->getTotalQty($mod->getId()) > 0)
                                    {
                                    $json .= '"percent" : '.number_format((float)((100/$mat->getTotalQty($mod->getId()))*$delivery->getSum()), 2).'
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
        $sche = Catalogo::Schedules($_GET['date']);
		$mat = new Material();
        $json = '{"models" : [';
		$primero =  true;
		foreach($sche as $mod)
		{
			$delivery = new Delivery($mod->getId(), $_GET['date']);
			if (!$primero) $json .= ','; else $primero = false;
			$json .= '	{ 
                                "id": '.$mod->getId().',
                                "number" : '.$mod->getNumber().',
                                "owner" : "'.$mod->getOwner().'",
                                "lot" : "'.$mod->getLot().'",
                                "startDate" : "'.$mod->getStartDate().'",
                                "line" : "'.$mod->getIdLine()->getDescription().'",
								"lineId" : "'.$mod->getIdLine()->getId().'",
                                "totalQty" : '.$mat->getTotalQty($mod->getId()).',
                                "totalDelivery" : '.$delivery->getSum().',';
                                if ($mat->getTotalQty($mod->getId()) > 0)
                                    {
                                    $json .= '"percent" : '.number_format((float)((100/$mat->getTotalQty($mod->getId()))*$delivery->getSum()), 2).'
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

 ?>
