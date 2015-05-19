<?php
	require_once('/../accesodatos/conexion.php');
	require_once('type.php');
	require_once('subcontractor.php');
	
	class User extends Conexion
	{
		private $id;
		private $email;
		private $password;
		private $name;
		private $lastname;
		private $typeId;
		private $subcontractorId;
		
		public function getId(){return $this->id;}
		public function setId($value){$this->id = $value;}
		public function getEmail(){return $this->email;}
		public function setEmail($value){$this->email = $value;}
		public function getPassword(){return $this->password;}
		public function setPassword($value){$this->password = $value;}
		public function getName(){return utf8_encode($this->name);}
		public function setName($value){$this->name = $value;}
        public function getLastName(){return utf8_encode($this->lastname);}
		public function setLastName($value){$this->lastname = $value;}
        public function getTypeId(){return $this->typeId;}
        public function setTypeId($value){$this->typeId = $value;}
        public function getSubcontractor(){return $this->subcontractorId;}
        public function setSubcontractor($value){$this->subcontractorId = $value;}
		
		public function __construct()
		{
			$argumentos = func_get_args();
			if(func_num_args() == 0)
			{
				$this -> id = 0;
				$this -> email = '';
				$this -> password = '';
				$this -> name = '';
				$this -> lastname = '';
				$this -> typeId = 0;
				$this -> subcontractorId = 0;
			}
			else if(func_num_args() == 1)
			{
				$id = $argumentos[0];
				parent::abrirConexion();
				$instruccion = "SELECT  email, name, lastname, type_Id, subcontractor_Id FROM users WHERE id = ?";
				$comando = parent::$conexion -> prepare($instruccion);
				$comando -> bind_param('i', $id);
				$comando -> execute();
				$comando -> bind_result($email, $name, $lastname, $typeId, $subcontractorId);
				$encontro = $comando -> fetch();
				mysqli_stmt_close($comando);
				parent::cerrarConexion();
				if($encontro)
				{
					$this -> id = $id;
                    $this -> email = $email;
                    $this -> name = $name;
                    $this -> lastname = $lastname;
                    $this -> typeId = new Type($typeId);
                    $this -> subcontractorId = new Subcontractor($subcontractorId);
				}
				else
				{
					$this -> id = 0;
                    $this -> email = '';
                    $this -> name = '';
                    $this -> lastname = '';
                    $this -> typeId = new Type();
                    $this -> subcontractorId = new Subcontractor();
				}
			}
			else if(func_num_args() == 2)
			{
				$email = $argumentos[0];
				$password = $argumentos[1];
				parent::abrirConexion();
				$instruccion = "SELECT id, name, lastname, type_Id, subcontractor_Id FROM users WHERE email = ? and password = sha1(?)";
				$comando = parent::$conexion -> prepare($instruccion);
				$comando -> bind_param('ss', $email, $password);
				$comando -> execute();
				$comando -> bind_result($id, $name, $lastname, $typeId, $subcontractorId);
				$encontro = $comando -> fetch();
				mysqli_stmt_close($comando);
				parent::cerrarConexion();
				if($encontro)
				{
					$this -> id = $id;
                    $this -> email = $email;
                    $this -> password = $password;
                    $this -> name = $name;
                    $this -> lastname = $lastname;
                    $this -> typeId = new Type($typeId);
                    $this -> subcontractorId = new Subcontractor($subcontractorId);
				}
				else
				{
					$this -> id = 0;
                    $this -> email = '';
                    $this -> password = '';
                    $this -> name = '';
                    $this -> lastname = '';
                    $this -> typeId = new Type();
                    $this -> subcontractorId = new Subcontractor();
				}
			}
            else if(func_num_args() == 6)
            {
                $this->email = $argumentos[0];
                $this->password = $argumentos[1];
                $this->name = $argumentos[2];
                $this->lastname = $argumentos[3];
                $this->typeId = $argumentos[4];
                $this->subcontractorId = $argumentos[5];
            }
		}
		
	}
?>
