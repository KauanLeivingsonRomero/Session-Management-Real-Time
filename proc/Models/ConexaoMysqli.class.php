<?php 
Class ConexaoMysqli extends Config
{

	private   $host, $user, $senha, $banco;
	protected $obj, $con;

	function __construct()
	{
		$this->host 	= self::BD_HOST;
		$this->user 	= self::BD_USER;
		$this->senha 	= self::BD_SENHA;
		$this->banco 	= self::BD_BANCO;

	}


	private function Conectar()
	{   mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		try {
				$this->con = new mysqli($this->host, $this->user, $this->senha, $this->banco);
				if ($this->con->connect_error) {
					return ("Não foi possivel se conectar a base");
				}else{
					return $this->con;
				}  
				
		} catch (mysqli_sql_exception $e) {
			exit('<h2> Erro no processo de Conexão </h2><BR>'.$e->__toString());
		}

	}

	function Query($query)
	{ 
		try {
			$this->obj = $this->Conectar()->prepare($query);
		} catch (mysqli_sql_exception $e) {
			exit('<h2> Erro no processo</h2> <BR>'.$e->__toString());
		}

	}
    
	function ExecuteQuery()
	{ 
        return $this->obj->execute();
	}

    function ListarDadosAll()
	{   
		$result = $this->obj->get_result();
		return $result->fetch_all();
	}

    function Close()
	{
		return $this->obj->close();
	}

	function LimpInjection($obj){
		$obj = preg_replace('/(from|alter table|select|insert|delete|update|where|drop table|show tables|#|--)/i', '', $obj);
		$obj = trim($obj);	   
		$obj = strip_tags($obj);	   
		if(!get_magic_quotes_gpc()){	      
			$obj = addslashes($obj);}	      
			return $obj;	   
    }

}

 ?>