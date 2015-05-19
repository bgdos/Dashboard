<?php
	require_once('/../accesodatos/conexion.php');
	require_once('model.php');
	require_once('material.php');
	
	class Produced extends Conexion
	{
		//atributos
		private $id;
		private $qty;
		private $pDate;
        private $modelId;
        private $materialId;
        private $daily;
        private $sum;
		
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
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select qty, p_date, model_id, material_id from produced where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($qty, $pDate, $modelId, $materialId);
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
				}
				else
				{
					$this->id = 0;
                    $this->qty = 0;
                    $this->pDate = '';
                    $this->modelId = new Model();
                    $this->materialId = new Material();
				}	
			}
           else if (func_num_args()==2)
		      {
                $instruccion = 'SELECT SUM(CASE WHEN model_id = ? AND p_date = ? THEN qty else 0 END) AS daily, SUM(CASE WHEN model_id = ? THEN qty ELSE 0 END) AS total
    FROM produced; ';
                //abrimos conexion
                parent::abrirConexion();
                //preparar comando
                $comando = parent::$conexion->prepare($instruccion);
                $comando->bind_param('isi', $argumentos[0], $argumentos[1], $argumentos[0]);
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
	}
?>
