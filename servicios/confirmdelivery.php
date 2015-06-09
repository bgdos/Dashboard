<?php 
require_once('../clases/material.php');
require_once('../clases/produced.php');
require_once('../clases/delivery.php');
require_once('../clases/delivery.php');
header('Access-Control-Allow-Origin: *');
    if (isset($_POST['materials']))
	{
		 $materials = $_POST['materials'];
		if ($materials != null)
		{
			$instruccion ="";
			$d = new Delivery();
			for ($i = 0; $i < count($materials); $i++ )
			{
				$instruccion .= "update delivery set qty = ".$materials[$i]['qty'].", statusId = 2 where packing  = '".$materials[$i]['packing']."';";
				if ($materials[$i]['qty'] != $materials[$i]['packqty'])//para cuando este en linea
				{
					$instruccion .=
					$m = new Material($materials[$i]['material']);
					$s = new Subcontractor($materials[$i]['subcontractor']);
					$email_to = 'faustos@trasnlead.com, juansutt@translead.com'; // required
					$email_from = 'juans@translead.com'; // required
					$email_subject = 'Descrepancy Packing list # '. $materials[$i]['packing']; // required
					$email_message = 'Please review and take the propoer action: \n \n 
										Subcontractor: \t'. $s->getName().'\n
										Packing list: \t'. $materials[$i]['packing'].'\n
										Material number: \t'.$m->getNumber().'\n
										Material description: \t'.$m->getDescription().'\n
										Packing Quantity: \t'.$materials[$i]['packqty'].'\n
										Actual Quantity: \t'.$materials[$i]['qty'].'\n\n
										Thank you.'; // required
					// create email headers
					$headers = 'From: Dashboard Admin \r\n'.
					'Reply-To: '.$email_from."\r\n" .
					'X-Mailer: PHP/' . phpversion();
					mail($email_to, $email_subject, $email_message, $headers);

				}
			
			}
			if ($d->ConfirmDelivery($instruccion) === true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
