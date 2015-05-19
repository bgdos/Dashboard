<?php
	require_once('/../accesodatos/conexion.php');
	
	class Subcontractor extends Conexion
	{
		//atributos
		private $id;
		private $name;
		
		//propiedades
		public function getId() { return $this->id; }
		public function setId($valor) { $this->id = $valor; }
		public function getName() { return utf8_encode($this->name); }
		public function setName($valor) { $this->name = $valor; }
		
		//constructor
		function __construct()
		{
			//leer argumentos
			$argumentos = func_get_args();
			//no se recibieron argumentos, se construye el objeto vacio
			if(func_num_args() == 0) 
			{
				$this->id = 0;
				$this->name = '';
			}
			//se recibió un argumento, se construye el objeto con datos
			if(func_num_args() == 1)
			{
				//leer id
				$id = $argumentos[0];
				//abrir conexión a servidor
				parent::abrirConexion();
				//comando de SQL
				$instruccion = "select nombre from subcontractor where id = ?";
				//comando
				$comando = parent::$conexion->prepare($instruccion);
				//parámetros
				$comando->bind_param('i', $id);
				//ejecutar comando
				$comando->execute();
				//resultado
				$comando->bind_result($name);
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
					$this->name = $name;
				}
				else
				{
					$this->id = 0;
					$this->name = '';
				}	
			}
		}
	}
?>
