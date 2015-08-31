<?php
	require_once('conexion.php');
	require_once('/../clases/schedule.php');
	require_once('/../clases/material.php');
	require_once('/../clases/model.php');
	require_once('/../clases/produced.php');
	require_once('/../clases/delivery.php');
	require_once('/../clases/subassy.php');
    require_once('/../clases/user.php');

	
	class Catalogo extends Conexion
	{
		public static function Schedules()
		{
			//recibir argumentos
			$argumentos = func_get_args();
			if (func_num_args()==1)
			{
				//arreglos
				$ids = array();
				$models = array();
				$date = '%'.$argumentos[0].'%';
				//instruccion
				$instruccion = 'SELECT id FROM model WHERE sdate LIKE ? ORDER BY line_Id ASC, sdate';
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('s', $date);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($models, new Model($id));
				//regresar resultado
				return $models;//regresamos el resultado
				}
			if (func_num_args()==2)
			{
				//arreglos
				$ids = array();
				$date = '%'.$argumentos[1].'%';
				$models = array();
				//instruccion
				$instruccion = "SELECT id FROM model WHERE line_Id = ? AND sdate LIKE ? ORDER BY sdate";
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('is', $argumentos[0], $date);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($models, new Model($id));
				//regresar resultado
				return $models;//regresamos el resultado
				}
			
		}
        public static function Materials()
		{
            	
        $argumentos = func_get_args();
		if (func_num_args()==2)
		{
			//arreglos
			$ids = array();
			$materials = array();
			//instruccion
			$instruccion = "SELECT id FROM material WHERE model_Id =? AND description = ?";
			//abrimos conexion
			parent::abrirConexion();
			//preparar comando
			$comando = parent::$conexion->prepare($instruccion);
			$comando->bind_param('is', $argumentos[0], $argumentos[1]);
			//ejecutar comando
			$comando->execute();
			//ligar resultado
			$comando->bind_result($id);
			//llenar arreglo de ids
			while ($comando->fetch()) array_push($ids, $id);
			//cerrar comando
			mysqli_stmt_close($comando);
			//cerrar conexion
			parent::cerrarConexion();
			//llenar arreglo 
			foreach ($ids as $id)
				array_push($materials, new Material($id));
			//regresar resultado
			return $materials;//regresamos el resultado
			}
			
        }
        
        public static function DailyReport()
		{
            	
        $argumentos = func_get_args();
		if (func_num_args()==2)
		{
			//arreglos
			$ids = array();
			$materials = array();
			//instruccion
			$instruccion = "(SELECT produced.material_id FROM produced 
                            JOIN material ON produced.material_Id = material.id 
                            JOIN po ON material.po_id = po.id
                            WHERE p_date =  ? AND  po.subcontractor_Id = ? GROUP BY material_Id)
UNION
(SELECT delivery.material_id FROM delivery 
                            JOIN material ON delivery.material_Id = material.id 
                            JOIN po ON material.po_id = po.id
                            WHERE d_date = ? AND  po.subcontractor_Id = ? GROUP BY material_Id)";
			//abrimos conexion
			parent::abrirConexion();
			//preparar comando
			$comando = parent::$conexion->prepare($instruccion);
			$comando->bind_param('sisi', $argumentos[0], $argumentos[1], $argumentos[0], $argumentos[1]);
			//ejecutar comando
			$comando->execute();
			//ligar resultado
			$comando->bind_result($id);
			//llenar arreglo de ids
			while ($comando->fetch()) array_push($ids, $id);
			//cerrar comando
			mysqli_stmt_close($comando);
			//cerrar conexion
			parent::cerrarConexion();
			//llenar arreglo 
			foreach ($ids as $id)
				array_push($materials, new Material($id));
			//regresar resultado
			return $materials;//regresamos el resultado
			}
			
        }
        public static function ModelDetails()
		{	
            $argumentos = func_get_args();
            if (func_num_args()==1)
            {
                //arreglos
                $ids = array();
                $materials = array();
                //instruccion
                $instruccion = "SELECT Id FROM material WHERE  model_Id = ? GROUP BY Id";
                //abrimos conexion
                parent::abrirConexion();
                //preparar comando
                $comando = parent::$conexion->prepare($instruccion);
                $comando->bind_param('i', $argumentos[0]);
                //ejecutar comando
                $comando->execute();
                //ligar resultado
                $comando->bind_result($id);
                //llenar arreglo de ids
                while ($comando->fetch()) array_push($ids, $id);
                //cerrar comando
                mysqli_stmt_close($comando);
                //cerrar conexion
                parent::cerrarConexion();
                //llenar arreglo 
                foreach ($ids as $id)
                    array_push($materials, new Material($id));
                //regresar resultado
                return $materials;//regresamos el resultado
			}
        }
		
		 public static function descriptionMaterial()
		{
            	
			//arreglos
			$ids = array();
			$materials = array();
			//instruccion
			$instruccion = "SELECT id FROM subassy ORDER BY description";
			//abrimos conexion
			parent::abrirConexion();
			//preparar comando
			$comando = parent::$conexion->prepare($instruccion);
			//ejecutar comando
			$comando->execute();
			//ligar resultado
			$comando->bind_result($id);
			//llenar arreglo de ids
			while ($comando->fetch()) array_push($ids, $id);
			//cerrar comando
			mysqli_stmt_close($comando);
			//cerrar conexion
			parent::cerrarConexion();
			//llenar arreglo 
			foreach ($ids as $id)
				array_push($materials, new Subassy($id));
			//regresar resultado
			return $materials;//regresamos el resultado
			
        }
		
		 public static function descriptionModel()
		{
		//arreglos
		$ids = array();
		$models = array();
		//instruccion
		$instruccion = "SELECT id FROM model WHERE  status_Id = 1 ORDER BY number";
		//abrimos conexion
		parent::abrirConexion();
		//preparar comando
		$comando = parent::$conexion->prepare($instruccion);;
		//ejecutar comando
		$comando->execute();
		//ligar resultado
		$comando->bind_result($id);
		//llenar arreglo de ids
		while ($comando->fetch()) array_push($ids, $id);
		//cerrar comando
		mysqli_stmt_close($comando);
		//cerrar conexion
		parent::cerrarConexion();
		//llenar arreglo 
		foreach ($ids as $id)
			array_push($models, new Model($id));
		//regresar resultado
		return $models;//regresamos el resultado
			
        }
		public static function PurchaseOrders()
		{
			 $argumentos = func_get_args();
			if (func_num_args()==1)
			{
				//arreglos
				$ids = array();
				$pos = array();
				//instruccion
				$instruccion = 'select id from material where po_Id = ?';
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('i', $argumentos[0]);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($pos, new Material($id));
				//regresar resultado
				return $pos;//regresamos el resultado
				}
			
		}
		
    	public static function MaterialProduction()
		{
			 $argumentos = func_get_args();
			if (func_num_args()==2)
			{
				//arreglos
				$ids = array();
				$mat = array();
				//instruccion
				$instruccion = 'SELECT material.id FROM material
								JOIN model ON material.model_Id = model.id
								JOIN po ON material.po_id = po.Id
								WHERE po.id = ? AND po.status_Id = 1 AND po.subcontractor_Id = ?';
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('ii', $argumentos[0], $argumentos[1]);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($mat, new Material($id));
				//regresar resultado
				return $mat;//regresamos el resultado
				}
			
		}
        public static function Delivery()
		{
			 $argumentos = func_get_args();
			if (func_num_args()==2)
			{
				//arreglos
				$ids = array();
				$mat = array();
				//instruccion
				$instruccion = 'SELECT material.id FROM material 
								JOIN po ON material.po_id = po.Id
								WHERE po_Id = ? AND po.subcontractor_Id = ?';
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('ii', $argumentos[0], $argumentos[1]);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($mat, new Material($id));
				//regresar resultado
				return $mat;//regresamos el resultado
				}	
		}
		public static function DeliveryConfirm()
		{
			 $argumentos = func_get_args();
			if (func_num_args()==1)
			{
				//arreglos
				$ids = array();
				$mat = array();
				//instruccion
				$instruccion = 'SELECT id FROM delivery where packing = ? AND statusid = 1';
				//abrimos conexion
				parent::abrirConexion();
				//preparar comando
				$comando = parent::$conexion->prepare($instruccion);
				$comando->bind_param('s', $argumentos[0]);
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($mat, new Delivery($id));
				//regresar resultado
				return $mat;//regresamos el resultado
				}
			
		}
        public static function Subcontractors()
		{
				$argumentos = func_get_args();
				//arreglos
				$ids = array();
				$sub = array();
				//instruccion
				if (func_num_args()==1)
				{
					$instruccion = 'SELECT subcontractor_id FROM discrepancy WHERE discrepancy_date=?';
					parent::abrirConexion();
					//preparar comando
					$comando = parent::$conexion->prepare($instruccion);
					$comando->bind_param('s', $argumentos[0]);
				}
				if (func_num_args()==2)
				{
					$instruccion = 'SELECT subcontractor_id FROM discrepancy WHERE discrepancy_date BETWEEN ? AND ? GROUP BY subcontractor_id';
					parent::abrirConexion();
					//preparar comando
					$comando = parent::$conexion->prepare($instruccion);
					$comando->bind_param('ss', $argumentos[0], $argumentos[1]);
				}
				//ejecutar comando
				$comando->execute();
				//ligar resultado
				$comando->bind_result($id);
				//llenar arreglo de ids
				while ($comando->fetch()) array_push($ids, $id);
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//llenar arreglo 
				foreach ($ids as $id)
					array_push($sub, new Subcontractor($id));
				//regresar resultado
				return $sub;//regresamos el resultado
		}
        public static function UsersList()
        {
            //arreglos
            $ids = array();
            $usr = array();
            //instruccion
            $instruccion = 'SELECT email from users order by id';
            //abrimos conexion
            parent::abrirConexion();
            //preparar comando
            $comando = parent::$conexion->prepare($instruccion);
            //ejecutar comando
            $comando->execute();
            //ligar resultado
            $comando->bind_result($id);
            //llenar arreglo de ids
            while ($comando->fetch()) array_push($ids, $id);
            //cerrar comando
            mysqli_stmt_close($comando);
            //cerrar conexion
            parent::cerrarConexion();
            //llenar arreglo    
            foreach ($ids as $id)
                array_push($usr, new User($id));
            //regresar resultado
            return $usr;//regresamos el resultado

        }
        public static function PackingList()
        {
            //arreglos
            $ids = array();
            $deliveries = array();
            //instruccion
            $instruccion = 'SELECT id FROM delivery WHERE statusId= 1 GROUP BY packing';
            //abrimos conexion
            parent::abrirConexion();
            //preparar comando
            $comando = parent::$conexion->prepare($instruccion);
            //ejecutar comando
            $comando->execute();
            //ligar resultado
            $comando->bind_result($id);
            //llenar arreglo de ids
            while ($comando->fetch()) array_push($ids, $id);
            //cerrar comando
            mysqli_stmt_close($comando);
            //cerrar conexion
            parent::cerrarConexion();
            //llenar arreglo    
            foreach ($ids as $id)
                array_push($deliveries, new Delivery($id));
            //regresar resultado
            return $deliveries;//regresamos el resultado
        }
	}
?>
