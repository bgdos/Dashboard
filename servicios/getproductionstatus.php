<?php 
	require_once('../clases/delivery.php');
	require_once('../clases/produced.php');
	require_once('../clases/model.php');
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');

    if (isset($_GET['Model']) & isset($_GET['date']))
       {
            $status = Catalogo::ModelDetails($_GET['Model']);
			$model = new Model($_GET['Model']);
            $json = '{"materials" : [';
		    $primero =  true;
			if (count($status) > 0)
			{
				foreach($status as $sta)
				{
					$del = new Delivery($_GET['date'], $sta->getId());
					$prod = new Produced($_GET['date'], $sta->getId());
					if (!$primero) $json .= ','; else $primero = false;
					$json .= '	{ 
										"model" : '.$model->getId().',
										"modelNumber" : '.$model->getNumber().',
										"lot" : '.$model->getLot().',
										"material" : '.$sta->getId().',
										"description" : "'.$sta->getDescription().'",
										"dailyP" : '.$prod->getDaily().',
										"sumP" : '.$prod->getSum().',
										"dailyD" : '.$del->getDaily().',
										"sumD" : '.$del->getSum().'

								}';
				}
				$json .= ' ] }';	
			}
			else
			{
				$json .= '	{ 
										"model" : '.$model->getId().',
										"modelNumber" : '.$model->getNumber().',
										"lot" : '.$model->getLot().',
										"material" : 0,
										"description" : "'.$sta->getDescription().'",
										"dailyP" : 0,
										"sumP" : 0,
										"dailyD" : 0,
										"sumD" : 0

								}';
					$json .= ' ] }';
				}
					
				
			}
    echo $json;
 ?>
