<?php
	require_once('/../accesodatos/conexion.php');
	require_once('subcontractor.php');
	require_once('delivery.php');
	
	class Discrepancy extends Conexion
	{
		//atributos
		private $id;
		private $delivery;
		private $subcontractor;
        private $packingQTY;
        private $actualQTY;
        private $discrepancyQTY;
        private $date;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
        public function getDelivery() { return $this->delivery; }
		public function setDelivery($value) { $this->delivery = $value; }
		public function getSubcontractor() { return $this->subcontractor; }
		public function setSubcontractor($value) { $this->subcontractor = $value; }
        public function getPackingQTY() { return $this->packingQTY; }
		public function setPackingQTY($value) { $this->packingQTY = $value; }
        public function getActualQTY() { return $this->actualQTY; }
		public function setActualQTY($value) { $this->actualQTY = $value; }
        public function getDiscrepancyQTY() { return $this->discrepancyQTY; }
        public function setDiscrepancyQTY($value) { $this->discrepancyQTY = $value; }
        public function getDate() { return $this->date; }
        public function setDate($value) { $this->date = $value; }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->delivery = new Delivery;
				$this->subcontractor = new Subcontractor();
                $this->packingQTY = 0;
                $this->actualQTY = 0;
                $this->discrepancyQTY  = 0;
                $this->date  = '';
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select delivery_Id, subcontractor_Id, actual_qty, packing_qty, discrepancy_qty, discrepancy_date from discrepancy where id = ?";
                
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($delivery, $subcontractor, $packingQTY, $actualQTY, $discrepancy, $date);
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
                    $this->delivery = $delivery;
                    $this->subcontractor = $subcontractor;
                    $this->packingQTY = $packingQTY;
                    $this->actualQTY = $actualQTY;
                    $this->discrepancyQTY  = $discrepancy;
                    $this->date  = $date;
				}
				else
				{
					$this->id = 0;
                    $this->delivery = new Delivery;
                    $this->subcontractor = new Subcontractor();
                    $this->packingQTY = 0;
                    $this->actualQTY = 0;
                    $this->discrepancyQTY  = 0;
                    $this->date  = '';
				}	
			}
		}
	}
?>
