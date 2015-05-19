<?php
	require_once('/../accesodatos/conexion.php');
	require_once('model.php');
	require_once('line.php');
	
	class Schedule extends Conexion
	{
		//atributos
		private $id;
		private $date;
        private $modelId;
        private $lineId;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
		public function getDate() { return $this->date; }
		public function setDate($value) { $this->date = $value; }
		public function getModelId() { return $this->modelId; }
		public function setModelId($value) { $this->modelId = $value; }
        public function getLineId() { return $this->lineId; }
		public function setLineId($value) { $this->lineId = $value; }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->date = '';
                $this->modelId = new Model();
                $this->lineId = new Line();
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select date, model_id, line_id  from schedule where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($date, $modelId, $lineId);
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
                    $this->date = $date;
                    $this->modelId = new Model($modelId);
                    $this->lineId = new Line($lineId); 
				}
				else
				{
					$this->id = 0;
                    $this->date = '';
                    $this->modelId = new Model();
                    $this->lineId = new Line();
				}	
			}
			//se recibió dos argumentos, se construye el objeto con los argumentos recibidos
			if(func_num_args() == 3)
			{
				//pasar valuees de los argumentos a los atributos
				
				$this->date = $argumentos[0];
                $this->modelId = new Model($argumentos[1]);
                $this->lineaId = new Linea($argumentos[2]);
			}
		}
	}
?>
