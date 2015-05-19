<?php
	require_once('/../accesodatos/conexion.php');
	require_once('model.php');
	require_once('po.php');
	
	class Material extends Conexion
	{
		//atributos
		private $id;
		private $number;
		private $description;
        private $qty;
        private $modelId;
        private $poId;
        private $totalQty;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
		public function getNumber() { return $this->number; }
		public function setNumber($value) { $this->number = $value; }
        public function getDescription() { return $this->description; }
		public function setDescription($value) { $this->description = $value; }
        public function getQty() { return $this->qty; }
		public function setQty($value) { $this->qty = $value; }
        public function getModelId() { return $this->modelId; }
		public function setModelId($value) { $this->modelId = $value; }
        public function getPoId() { return $this->poId; }
		public function setPoId($value) { $this->poId = $value; }
        
        public function getTotalQty($value) {

        if(func_num_args() == 1)
                        {
                            //leer id
                            $id = $value;
                            //abrir conexión a servidor
                            parent::abrirConexion();
                            //comando de SQL
                            $instruccion = "SELECT SUM(qty) FROM material WHERE model_Id=?";
                            //comando
                            $comando = parent::$conexion->prepare($instruccion);
                            //parámetros
                            $comando->bind_param('i', $id);
                            //ejecutar comando
                            $comando->execute();
                            //resultado
                            $comando->bind_result($totalQty);
                            //leer datos 
                            $encontro = $comando->fetch();
                            //cerrar comando
                            mysqli_stmt_close($comando);
                            //cerrar conexion
                            parent::cerrarConexion();
                            //pasar values a los atributos
                            if($encontro)
                            {
                                if($totalQty != null)
                                $this->totalQty = $totalQty;
                                else
                                    $this->totalQty = 0;
                                
                            }
                            else 
                            {
                                $this->totalQty = 0;
                            }	

                            return $this->totalQty; 
            }
        }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->number = '';
				$this->description = '';
                $this->qty = 0;
                $this->modelId = new Model();
                $this->poId = new Po();
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select number, description, qty, model_id, po_id  from material where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($number, $description, $qty, $modelId, $poId);
				//leer datos 
				$encontro = $comando->fetch();
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//pasar values a los atributos
				if($encontro)
				{
					$this->id = $id;
                    $this->number = $number;
                    $this->description = $description;
                    $this->qty = $qty;
                    $this->modelId = new Model($modelId);
                    $this->poId = new Po($poId);
				}
				else
				{
					$this->id = 0;
                    $this->number = '';
                    $this->description = '';
                    $this->qty = 0;
                    $this->modelId = new Model();
                    $this->poId = new Po();
				}	
			}
			//se recibió dos argumentos, se construye el objeto con los argumentos recibidos
			if(func_num_args() == 5)
			{
				//pasar valuees de los argumentos a los atributos
				
				$this->number = $argumentos[0];
				$this->description = $argumentos[1];
                $this->qty = $argumentos[2];
                $this->modelId = new Model($argumentos[3]);
                $this->poId = new Po($argumentos[4]);
			}
		}
	}
?>
