<?php 
Class ConexaoPdo extends Config
{

	private   $host, $user, $senha, $banco;
	protected $obj, $con;

	function __construct()
	{
		$this->host 	= self::BD_HOST;
		$this->user 	= self::BD_USER;
		$this->senha 	= self::BD_SENHA;
		$this->banco 	= self::BD_BANCO;


		try {if($this->Conectar() == null){ $this->Conectar(); }
			
		} catch (Exception $e) {
			exit($e->getMessage().'<h2> Erro na Conexão, entre em contato com o Administrador! </h2>');
		}

	}
    
	private function Conectar()
	{
		$options   = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		$this->con = new PDO("mysql:host={$this->host};dbname={$this->banco}", $this->user, $this->senha, $options);
		return $this->con;
	}

	function ExecuteSQL($query, array $params = NULL)
	{  	try {
            
			$this->obj = $this->Conectar()->prepare($query);

			if(!empty($params)){
				foreach($params as $key =>$value){
					$this->obj->bindvalue($key, $value);
				}
			}

			return $this->obj->execute();
			
		} catch (Exception $e) {
			exit($e->getMessage().'<h2> Erro no processo </h2>');
		}

	}


    function ListarDadosAll()
	{
		return $this->obj->fetchall(PDO::FETCH_ASSOC);
		return $this->Desconecta();
	}

	function ListarDados()
	{
		return $this->obj->fetch(PDO::FETCH_ASSOC);
		return $this->Desconecta();
	}


	function TotalDados()
	{
		return $this->obj->rowCount();
	}

	function UltimoId()
	{
		return $this->con->lastInsertId();
	}
    
    function Desconecta()
	{
		$this->con = null;
	}

}

?>