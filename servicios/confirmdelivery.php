<?php 
	require_once('../clases/material.php');
	require_once('../clases/produced.php');
	require_once('../clases/delivery.php');
	header('Access-Control-Allow-Origin: *');
    date_default_timezone_set('America/Tijuana');
    $date = date('Y-m-d');
    if (isset($_POST['materials']))
	{
		 $materials = $_POST['materials'];
		 $discrepancies = array();
		 $s = new Subcontractor($materials[0]['subcontractor']);
		 $sub = $s->getName();
		if ($materials != null)
		{
			$instruccion ="";
			$d = new Delivery();
			for ($i = 0; $i < count($materials); $i++ )
			{
				$instruccion .= "update delivery set qty = ".$materials[$i]['qty'].", statusId = 2 where id  = '".$materials[$i]['packing']."';";
			if ($materials[$i]['qty'] != $materials[$i]['packqty'])//para cuando este en linea
				{
					$instruccion .= "INSERT INTO discrepancy(delivery_id, subcontractor_id, actual_qty, packing_qty, discrepancy_qty, discrepancy_date) VALUES(". $materials[$i]['packing'].",". $materials[$i]['subcontractor'].",					".$materials[$i]['qty'].", ".$materials[$i]['packqty'].", ".($materials[$i]['qty']-$materials[$i]['packqty']).", '".$date."');";
				$m = new Material($materials[$i]['material']);
				$dis = $materials[$i]['qty'] - $materials[$i]['packqty'];
				array_push($discrepancies, array($m->getNumber(), $m->getDescription(), $materials[$i]['po'], $materials[$i]['packqty'], $materials[$i]['qty'], $dis));
				}
			}
			if (count($discrepancies) > 0)
			{
				$p =  new Delivery($materials[0]['packing']);
				for ($i = 0; $i < count($discrepancies); $i++)
					$message .= '<tr>'.
                        '<td>'.$discrepancies[$i][0].'</td>'.
                        '<td>'.$discrepancies[$i][1].'</td>'.
                        '<td>'.$discrepancies[$i][2].'</td>'.
                        '<td>'.$discrepancies[$i][3].'</td>'.
                        '<td>'.$discrepancies[$i][4].'</td>'.
                        '<td>'.$discrepancies[$i][5].'</td>'.
                        '<td>'.$sub.'</td>'.
                        '<td>'.$p->getPacking().'</td>'.
                    '</tr>';
				$email_to = 'AlfredoS@translead.com, DanielI@translead.com, faustos@translead.com, GilP@translead.com, GonzaloR@translead.com, HectorZ@translead.com, humbertorg@translead.com, IsmaelC@translead.com, JoelP@translead.com, JorgeR@translead.com, JorgeS@translead.com, JoseAS@translead.com, juans@translead.com, MiguelD@translead.com, seilk@translead.com'; // required
				$email_from = 'juans@translead.com'; // required
				$email_subject = 'Descrepancy From: '. $sub .', Packing list #: '. $p->getPacking(); // required
				$email_message = '<html>
									<head>
										<style>
											body{
												background: #fff;
												font-family: "Arial", sans-serif; 
												color: #6d6d6d;
											}
											table, th, td, tr{
												border: solid 1pt #d1d1d1; 
												border-collapse: collapse;
											}
											th, td{
												padding: 5px;
											}
											table{
												text-align: left;
												background: #e0e0e0; 
											}
											table{
												text-align: center;
												border-top: solid #103988;
												margin: 10px;
											}
											thead{background: #3e5b7c; color: #fff;}
											span{font-size:10px;}
										</style>
									</head>
									<body>
										<p>Hello, please review the discrepancy and take the proper action:</p>
										<table>
											<thead>
												<tr>
													<th>Sap No.</th>
													<th>Description</th>
                                                    <th>PO No.</th>
													<th>Packing Qty</th>
													<th>Actual Qty</th>
													<th>Discrepancy</th>
                                                    <th>Subcontractor</th>
                                                    <th>Packing No.</th>
												</tr>
											</thead>
											<tbody>'.
											$message
											.'</tbody>
										</table><br>
										Thank you.<br>
										<br><br><br>
										<center>
											<span>This mail was sent to you automatically by the Outsourcing Dashboard System<span><br>
											<img src="http://translead-dashboard.esy.es/images/logo.png"><br>
                                            <span>Dashboard System was developed by Juan Salgado and Fausto Serrano for Hyundai Translead.<span><br>
										</center>
										</body>
									</html>'; // required
				// create email headers
				$headers = 'From: Outsourcing Dashboard <juansalgado@outlook.com>\r\n'.
				'Reply-To: '.$email_from."\r\n" .
				'Content-type: text/html; charset=iso-8859-1 \r\n'.
				'X-Mailer: PHP/' . phpversion();
				$send = mail($email_to, $email_subject, $email_message, $headers);
				if (/*$send & */$d->ConfirmDelivery($instruccion))
					echo '{ "status" : 0, "message" : "Data saved successfully." }';
			}
			else
			{
				if ($d->ConfirmDelivery($instruccion))
					echo '{ "status" : 0, "message" : "Data saved successfully." }';
			}
			
		}
		else
			echo '{ "status" : 1, "message" : "Error on data saving." }';
    }
	else
		echo '{ "status" : 2, "message" : "Error, no data received." }';
 ?>
