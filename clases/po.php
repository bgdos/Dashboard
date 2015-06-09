<?php
	require_once('/../accesodatos/conexion.php');
	require_once('subcontractor.php');
	
	class Po extends Conexion
	{
		//atributos
		private $id;
		private $date;
		private $subcontractorId;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($value) { $this->id = $value; }
		public function getDate() { return $this->date; }
		public function setDate($value) { $this->date = $value; }
        public function getSubcontractorId() { return $this->subcontractorId; }
		public function setSubcontractorId($value) { $this->subcontactorId = $value; }
		
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
				$this->subcontractorId = new Subcontractor();
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select date, subcontractor_Id from po where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($date, $subcontractorId);
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
                    $this->date = $date;
                    $this->subcontractorId = new Subcontractor($subcontractorId); 
				}
				else
				{
					$this->id = 0;
                    $this->date = '';
                    $this->subcontractorId = new Subcontractor();
				}	
			}
			//se recibió dos argumentos, se construye el objeto con los argumentos recibidos
			if(func_num_args() == 2)
			{
				//pasar valuees de los argumentos a los atributos
				
				$this->date = $argumentos[0];
				$this->subcontractorId = new Subcontractor($argumentos[1]);
			}
		}
	}
?>
