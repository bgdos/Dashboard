<?php
	require_once('/../accesodatos/conexion.php');
	require_once('model.php');
	require_once('material.php');
	
	class Delivery extends Conexion
	{
		//atributos
		private $id;
		private $qty;
		private $pDate;
		private $modelId;
		private $materialId;
		private $daily;
		private $sum;
		private $packing;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
        public function getQty() { return $this->qty; }
		public function setQty($value) { $this->qty = $value; }
		public function getPDate() { return $this->pDate; }
		public function setPDate($value) { $this->pDate = $value; }
        public function getModelId() { return $this->modelId; }
		public function setModelId($value) { $this->modelId = $value; }
        public function getMaterialId() { return $this->materialId; }
		public function setMaterialId($value) { $this->materialId = $value; }
        public function getDaily() { return $this->daily; }
        public function getSum() { return $this->sum; }
        public function getPacking() { return $this->packing; }
        public function setPacking($value) { $this->packing = $value; }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->qty = 0;
				$this->pDate = '';
                $this->modelId = new Model();
                $this->materialId = new Material();
                $this->packing  = '';
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select qty, d_date, model_id, material_id, packing from delivery where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($qty, $pDate, $modelId, $materialId, $packing);
				//leer datos 
				$encontro = $comando->fetch();
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//pasar valuees a los atributos
				if($encontro)
				{
					$this->id = $id;
                    $this->qty = $qty;
                    $this->pDate = $pDate;
                    $this->modelId = new Model($modelId);
                    $this->materialId = new Material($materialId);
                    $this->packing  = $packing;
				}
				else
				{
					$this->id = 0;
                    $this->qty = 0;
                    $this->pDate = '';
                    $this->modelId = new Model();
                    $this->materialId = new Material();
                    $this->packing  = '';
				}	
			}
             else if (func_num_args()==2)
		      {
                 if (is_int($argumentos[0]))
                 {
                     //comando de SQL
                    $instruccion = 'SELECT SUM(CASE WHEN model_id = ? AND d_date = ? THEN qty else 0 END) AS daily, SUM(CASE WHEN model_id = ? THEN qty ELSE 0 END) AS total
    FROM delivery; ';
                    //abrimos conexion
                    parent::abrirConexion();
                    //preparar comando
                    $comando = parent::$conexion->prepare($instruccion);
                    $comando->bind_param('isi', $argumentos[0], $argumentos[1], $argumentos[0]);
                 }
                 if (is_string($argumentos[0]))
                 {
                     //comando de SQL
                    $instruccion = 'SELECT SUM(CASE WHEN d_date = ? AND material_Id = ? THEN qty else 0 END) AS daily, SUM(CASE WHEN material_Id = ? THEN qty ELSE 0 END) AS total
    FROM delivery; ';
                    //abrimos conexion
                    parent::abrirConexion();
                    //preparar comando
                    $comando = parent::$conexion->prepare($instruccion);
                    $comando->bind_param('sii', $argumentos[0], $argumentos[1], $argumentos[1]);
                 }
				
                //ejecutar comando
                $comando->execute();
                //ligar resultado
                $comando->bind_result($daily,$sum);
               //leer datos 
				$encontro = $comando->fetch();
                mysqli_stmt_close($comando);
                //cerrar conexion
                parent::cerrarConexion();
                    if($encontro)
                    {
                        $this->daily = $daily;
                        $this->sum = $sum;
                    }
                    else
                    {
                        $this->daily = 0;
                        $this->sum = 0;
                    }	
			
			}
			//se recibió dos argumentos, se construye el objeto con los argumentos recibidos
			if(func_num_args() == 4)
			{
				//pasar valuees de los argumentos a los atributos
				
				$this->qty = $argumentos[0];
				$this->pDate = $argumentos[1];
                $this->modelId = $argumentos[2];
                $this->materialId = $argumentos[3];
			}
		}
		function deliveredQty($id)
		{
			$instruccion = "SELECT sum(qty) FROM delivery WHERE material_id = ? AND statusId = 2;";
			parent::abrirConexion();
			$comando = parent::$conexion->prepare($instruccion);
			$comando->bind_param('i', $id);
			$comando->execute();
			$comando->bind_result($producedQty);
			//leer datos 
			$encontro = $comando->fetch();
			//cerrar comando
			mysqli_stmt_close($comando);
			//cerrar conexion
			if ($producedQty > 0)
				return $producedQty;
			else
				return 0;
		}
		function SaveDelivery($instruccion)// recibe una cadena de texto con uno o varios registros.
		{
			parent::abrirConexion();
			if (parent::$conexion -> multi_query($instruccion)=== true)
				echo '{ "status" : 0, "message" : "Delivery saved successfully." }';
			else 
				echo '{ "status" : 1, "message" : "Error saving data." }';
			parent::cerrarConexion();
		}
		function ConfirmDelivery($instruccion)// recibe una cadena de texto con uno o varios registros.
		{
			parent::abrirConexion();
			if (parent::$conexion -> multi_query($instruccion)=== true)
				echo '{ "status" : 0, "message" : "Delivery confirmed successfully." }';
			else 
				echo '{ "status" : 1, "message" : "Error confirming data." }';
			parent::cerrarConexion();
		}
	}
?>
