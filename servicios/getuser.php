<?php 
	require_once('../clases/user.php');
	require_once('../accesodatos/catalogos.php');
    header('Access-Control-Allow-Origin: *');
    
    if (isset($_GET['user']))
        {
            $user =  new User($_GET['user']);
        $json = '{"user": [{ 
                    "id": '.$user->getId().',
                    "email" : "'.$user->getEmail().'",
                    "name" : "'.$user->getName().'",
                    "lastname" : "'.$user->getLastName().'",
                    "type" : "'.$user->getTypeId()->getDescription().'",
                    "idType" : '.$user->getTypeId()->getId().',
                    "subcontractor" : "'.$user->getSubcontractor()->getName().'",
                    "subcontractorId" : "'.$user->getSubcontractor()->getId().'"
            }]}';
        }
    else
    {
            $usuarios = Catalogo::UsersList();
            $json = '{"users" : [';
		    $primero =  true;
				foreach($usuarios as $usr)
				{
					if (!$primero) $json .= ','; else $primero = false;
					$json .= '	{ 
										"email" : "'.$usr->getEmail().'",
										"name" : "'.$usr->getName().'",
										"lastname" : "'.$usr->getLastName().'",
										"type_Id" : '.$usr->getTypeId()->getId().',
										"subcontractor_Id" : '.$usr->getSubcontractor()->getId().',';
                                        if ($usr->getSubcontractor()->getId() > 0)
								            $json .= '"subcontractor" : "'.$usr->getSubcontractor()->getName().'",';
                                        else
                                            $json .= '"subcontractor" : "HYUNDAI",';
                                              
								$json .= '"type" : "'.$usr->getTypeId()->getDescription().'"
                                }';
				}
				$json .= ' ] }';	
    }
    echo $json;
 ?>
