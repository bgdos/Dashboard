<?php
	require_once('/../accesodatos/conexion.php');
	require_once('line.php');
	
	class Model extends Conexion
	{
		//atributos
		private $id;
		private $number;
		private $owner;
		private $lot;
		private $startDate;
        private $idLine;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
		public function getNumber() { return $this->number; }
		public function setNumber($value) { $this->number = $value; }
        public function getOwner() { return $this->owner; }
		public function setOwner($value) { $this->owner = $value; }
        public function getLot() { return $this->lot; }
		public function setLot($value) { $this->lot = $value; }
        public function getStartDate() { return $this->startDate; }
		public function setStartDate($value) { $this->startDate = $value; }
        public function getIdLine() { return $this->idLine; }
		public function setIdLine($value) { $this->idLine = $value; }
		
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
				$this->owner = '';
                $this->lot = 0;
                $this->startDate = '';
                $this->idLine = new Line();
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select number, owner, lot, sdate, line_Id from model where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($number, $owner, $lot, $startDate, $idLine);
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
                    $this->number = $number;
                    $this->owner = $owner;
                    $this->lot = $lot;
                    $this->startDate = $startDate;
                    $this->idLine = new Line($idLine);
				}
				else
				{
					$this->id = 0;
                    $this->number = '';
                    $this->owner = '';
                    $this->lot = 0;
                    $this->startDate = '';
                    $this->idLine = new Line();
				}	
			}
			//se recibió dos argumentos, se construye el objeto con los argumentos recibidos
			if(func_num_args() == 5)
			{
				//pasar valuees de los argumentos a los atributos
				
				$this->number = $argumentos[0];
				$this->owner = $argumentos[1];
                $this->lot = $argumentos[2];
                $this->startDate = $argumentos[3];
                $this->idLine = new Line($argumentos[4]);
			}
		}
		function saveSchedule($instruccion)// recibe una cadena de texto con uno o varios registros.
			{
			parent::abrirConexion();
			if (parent::$conexion -> multi_query($instruccion)=== true)
				echo '{ "status" : 0, "message" : "Data saved successfully." }';
			else 
				echo '{ "status" : 1, "message" : "Error on data saving." }';
			parent::cerrarConexion();
		}
		function deleteSchedule($instruccion)// recibe una cadena de texto con uno o varios registros.
			{
			parent::abrirConexion();
			if (parent::$conexion -> multi_query($instruccion)=== true)
				echo '{ "status" : 0, "message" : "Models deleted." }';
			else 
				echo '{ "status" : 1, "message" : "Error deleting data." }';
			parent::cerrarConexion();
		}
		function editSchedule($instruccion)// recibe una cadena de texto con uno o varios registros.
			{
			parent::abrirConexion();
			if (parent::$conexion -> multi_query($instruccion)=== true)
				echo '{ "status" : 0, "message" : "Data updated successfully." }';
			else 
				echo '{ "status" : 1, "message" : "Error updating data." }';
			parent::cerrarConexion();
		}
	}
?>
