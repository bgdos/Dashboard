<?php
	require_once('/../accesodatos/conexion.php');
require_once('discrepancy.php');
	
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
        public function getDiscrepancies()
        {
               $argumentos = func_get_args();
                if (func_num_args()==1)
                {
                    //abrir conexión a servidor
                    parent::abrirConexion();
                    //iniciar arreglo
                    $disc = array();
                    $ids = array();
                    $fecha = '%'.$argumentos[0].'%';
                    //instrucción
                    $instruccion = "SELECT id FROM discrepancy WHERE discrepancy_date LIKE ?  AND subcontractor_Id=?";
                    //comando
                    $comando = parent::$conexion->prepare($instruccion);
                    $comando->bind_param('si', $fecha, $this->id);
                    //ejecutar comando
                    $comando->execute();
                    //resultado
                    $comando->bind_result($id);
                    //llenar arreglo
                    while ($comando->fetch()) array_push($ids, $id);
                    //cerrar comando
                    mysqli_stmt_close($comando);
                    //cerrar conexion
                    parent::cerrarConexion();
                    //llenar arreglo de ensambles
                    foreach ($ids as $id)
                    array_push($disc, new Discrepancy($id));
                    //regresar arreglo
                    return $disc;
                }
            if (func_num_args()==2)
                {
                    //abrir conexión a servidor
                    parent::abrirConexion();
                    //iniciar arreglo
                    $disc = array();
                    $ids = array();
                    // leer argumentos
                    //instrucción
                    $instruccion = "SELECT id FROM discrepancy WHERE discrepancy_date BETWEEN ? AND ? AND subcontractor_Id=?";
                    //comando
                    $comando = parent::$conexion->prepare($instruccion);
                    $comando->bind_param('ssi', $argumentos[0], $argumentos[1], $this->id);
                    //ejecutar comando
                    $comando->execute();
                    //resultado
                    $comando->bind_result($id);
                    //llenar arreglo
                    while ($comando->fetch()) array_push($ids, $id);
                    //cerrar comando
                    mysqli_stmt_close($comando);
                    //cerrar conexion
                    parent::cerrarConexion();
                    //llenar arreglo de ensambles
                    foreach ($ids as $id)
                    array_push($disc, new Discrepancy($id));
                    //regresar arreglo
                    return $disc;
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
