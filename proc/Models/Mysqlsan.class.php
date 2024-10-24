<?php
Class Mysqlsan extends ConexaoMysqli
{

  private $Query = [];
	private $SaidaDados;

	public function __construct()
	{
		parent::__construct();

	}

   // ########################################################################
   //                            BIBLIOTECA QUERYS
   // ########################################################################
    public function execucao($query)
    {
        $this->Query($query);
        $this->ExecuteQuery();
        $this->SaidaDados = $this->ListarDadosAll();
        $this->close();
        return $this->SaidaDados;
    }
    
    public function querys($campos, $tabela, $num, $id = null, $busca1 = null, $busca2 = null){
             
           $busca1=$this->LimpInjection($busca1);
           $busca2=$this->LimpInjection($busca2);
           $this->Query[1] = "SELECT $campos FROM $tabela;";
           $this->Query[2] = "SELECT $campos FROM $tabela WHERE id = $id;";
           $this->Query[3] = "SELECT $campos FROM $tabela WHERE usu_email = '$busca1' AND usu_senha = '$busca2'";
           $this->Query[4] = "SELECT $campos FROM $tabela WHERE cpf = '$busca1'";

        return  $this->execucao($this->Query[$num]); 
    }

    public function LimpInjection($obj)
    {
      if(!is_null($obj)){
      $obj = preg_replace('/(from|alter table|select|insert|delete|update|where|drop table|show tables|#|--)/i', '', $obj);
      $obj = trim($obj);     
      $obj = strip_tags($obj);             
        $obj = addslashes($obj);    
        return $obj;     
      }
    }

}
?>