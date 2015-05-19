<?php
	require_once('/../accesodatos/conexion.php');
	
	class Type extends Conexion
	{
		//atributos
		private $id = 0;
		private $description = '';
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($valor) { $this->id = $valor; }
		public function getDescription() { return utf8_encode($this->description); }
		public function setDescription($valor) { $this->description = $valor; }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->description = '';
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select description from type where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($description);
				//leer datos 
				$encontro = $comando->fetch();
				//cerrar comando
				mysqli_stmt_close($comando);
				//cerrar conexion
				parent::cerrarConexion();
				//pasar valores a los atributos
				if($encontro)
				{
					$this->id = $id;
					$this->description = $description;
				}
				else
				{
					$this->id = 0;
					$this->description = '';
				}	
			}
		}
	}
?>
