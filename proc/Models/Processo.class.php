<?php
Class Processo extends ConexaoPdo
{
    private $Query;
	private $DadosCampos   = [];
	private $PreparaCampos = [];
	private $DadosExtras   = [];
    
	public function __construct()
	{
		parent::__construct();

	}

   // ########################################################################
   //                     CRUD INFORMAÇÃO
   // ########################################################################
    
    //lista dados
    public function lista($campos, $tabela, $where = null, $busca = null, $ordem = null)
    {
     	$this->Query = "SELECT {$campos} FROM {$tabela} ";
        if(!empty($where) && !empty($busca)){
           $this->Query .= "WHERE $where = '$busca' ";
        }
        if(!empty($ordem)){
           $this->Query .= "ORDER BY {$ordem} ASC ";
        }
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function updateSession($increment, $id)
    {
     	$this->Query = "UPDATE tb_sessions SET session_users = session_users + $increment WHERE session_id = $id ";      
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getConfig($game_id)
    {
     	$this->Query = "SELECT game_background FROM tb_game WHERE game_id = $game_id";
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getPoints($name, $email, $game_id)
    {
     	$this->Query = "SELECT points FROM tb_points WHERE name = '$name' AND email = '$email' AND game_id = $game_id";
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getRanking($game_id)
    {
        $this->Query = "SELECT name,points FROM tb_points WHERE game_id = $game_id ";    
        $this->Query.= "ORDER BY points DESC LIMIT 5";      
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function checkEmail($email, $game_id)
    {
     	$this->Query = "SELECT * FROM tb_cadastro WHERE email = '$email' AND game_id = $game_id";
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function checkQuestions($game_id)
    {
     	$this->Query = "SELECT game_id FROM tb_questions WHERE game_id = $game_id";
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }   

    public function expoGamePoints($game_id)
    {
        $this->Query = "SELECT 
                            tb_points.id,    
                            tb_points.name,
                            tb_points.email,
                            tb_points.points,
                            tb_game.game_name    
                        FROM 
                            tb_points
                        JOIN 
                            tb_game ON tb_game.game_id = tb_points.game_id
                        WHERE 
                            tb_game.game_id = $game_id
                        ORDER BY 
                            tb_points.points DESC;
                        ";       
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getId($id, $tabela, $column)
    {
     	$this->Query = "SELECT '$id' FROM {$tabela} where game_name = '$column'";       
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function leftjoin($game_id)
    {
     	$this->Query = "SELECT 
            g.game_id,
            g.game_name,
            g.game_background,
            q.question_id,
            q.question_text,
            q.question_image,
            q.question_timer,
            q.question_alternative1,
            q.question_alternative2,
            q.question_alternative3,
            q.question_alternative4,
            q.question_answer
            FROM
                tb_game g
                 LEFT JOIN
                tb_questions q ON g.game_id = q.game_id
            WHERE   
                g.game_id = '$game_id'
                
            ";       
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

   

    public function gameCount($tabela, $column, $game)
    {
     	$this->Query = "SELECT count(*) as 'total' FROM {$tabela} WHERE $column = '$game'";
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getWinners($game_id)
    {  
        $this->Query = "SELECT name,points FROM tb_points WHERE game_id = $game_id ";    
        $this->Query.= "ORDER BY points DESC LIMIT 3";      
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }


    //busca dados 
    public function getDadosSimple($campos, $tabela, $id)
    {   
      unset($this->PreparaCampos);
      $this->PreparaCampos[':id'] = (int)$id;
      $this->Query = "SELECT {$campos} FROM {$tabela} WHERE id = :id ";
      $this->ExecuteSQL($this->Query, $this->PreparaCampos);
      return $this->ListarDadosAll();
    }

    //busca dados
    public function getDadosComposto($campos, $tabela, array $busca, array $extras)
    {  
    $this->PreparaDados($busca);
    $this->PreparaCampos($busca);
    $this->PreparaExtras($extras);
      $this->Query = "SELECT {$campos} FROM {$tabela} ";
    $this->Query.= " WHERE ". implode(' AND ', $this->DadosCampos); 
    $this->Query.= " ". implode(' ', $this->DadosExtras); 
      $this->ExecuteSQL($this->Query, $this->PreparaCampos);
    return $this->ListarDadosAll();
    }
 
    //insere dados novos
    public function newDados(array $campos, $tabela)
    {
		 $this->PreparaDados($campos);
		 $keys = array_keys($campos);
		 $this->Query = ("INSERT INTO {$tabela} (".implode(',', $keys).") VALUES (:".implode(",:", $keys).")");
         $this->ExecuteSQL($this->Query, $this->PreparaCampos); 
         $id = $this->UltimoId();
         $this->Desconecta();
         return $id;
	}

    public function editConfig($title, $column, $tabela, $where, $id){		
		$this->Query = "UPDATE {$tabela} SET {$column} = '$title' WHERE $where = $id";
        $this->ExecuteSQL($this->Query, $this->PreparaCampos); 
        $this->Desconecta();
	}

    //seta os dados
	public function setDados(array $campos, $tabela, $where, $id){
        $this->PreparaDados($campos);
		$this->PreparaCampos($campos);
		$this->PreparaCampos[':id'] = (int)$id;
		$this->Query = "UPDATE {$tabela} SET ".implode(',', $this->DadosCampos)." WHERE $where = :id";
        $this->ExecuteSQL($this->Query, $this->PreparaCampos); 
        $this->Desconecta();
	}

    public function getUserPoints($nome, $email, $game_id)
    {
     	$this->Query = "SELECT id FROM tb_points ";        
        $this->Query .= " WHERE name = '$nome' ";
        $this->Query .= " AND email = '$email' ";
        $this->Query .= " AND game_id = $game_id ";
               
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }


    public function registerPoints($points, $user_id){
        $this->Query = "UPDATE tb_points SET points = $points WHERE id = $user_id";
        $this->ExecuteSQL($this->Query);
        $this->Desconecta();
    }
    

    //deleta dados dos games
    public function delDadosGames($tabela, $id, $condition)
	{   
        unset($this->PreparaCampos);
     	$this->PreparaCampos[':id'] = (int)$id;
		$this->Query = "DELETE FROM {$tabela} WHERE $condition = :id";
        $this->ExecuteSQL($this->Query, $this->PreparaCampos); 
        $this->Desconecta();
	}

    //delete dados
	public function delDados($tabela, $id)
	{   
        unset($this->PreparaCampos);
     	$this->PreparaCampos[':id'] = (int)$id;
		$this->Query = "DELETE FROM {$tabela} WHERE id = :id";
        $this->ExecuteSQL($this->Query, $this->PreparaCampos); 
        $this->Desconecta();
	}

    //Conta inscritos
    public function getCountTotal()
    {  
        $this->Query = "SELECT COUNT(id) AS qtd FROM tb_cadastro";    
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    //Conta acessos hoje
    public function getCountAcessados()
    {  
        $this->Query = "SELECT COUNT(id) AS qtd FROM tb_cadastro ";    
        $this->Query.= " WHERE cad_acesso IS NOT NULL";      
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    //Conta cadastros hoje
    public function getCountCadHoje()
    {  
        $dataAtual = date('Y-m-d');
        $this->Query = "SELECT COUNT(id) AS qtd FROM tb_cadastro ";    
        $this->Query.= " WHERE (DATE_FORMAT(cad_cadastro,'%Y-%m-%d') = '$dataAtual') AND cad_finalizado = 'SIM'";      
        $this->ExecuteSQL($this->Query);
        return $this->ListarDadosAll();
    }

    public function getLocalizar($campos, $texto)
    {   
        $ativaCpf = false;

        $this->Query = "SELECT id, $campos 
        cad_online, date_format(cad_data_login,'%d-%m-%Y %H:%m') AS acesso, cad_ativo FROM tb_cadastro WHERE ";    

        if(filter_var($texto, FILTER_VALIDATE_EMAIL)){
            $this->Query.= " email LIKE :texto "; 
        }elseif(is_numeric($texto) AND strlen($texto)==11){
            $ativaCpf = true;
            $texto = substr($texto,0,3).".".substr($texto,3,3).".".substr($texto,6,3)."-".substr($texto,9,2);
            $this->Query.= " cpf = :texto "; 
        }else{
            $this->Query.= " (nome LIKE :texto) "; 
        } 

        unset($this->PreparaCampos);
        $this->PreparaCampos[':texto'] = (!$ativaCpf)?'%'.trim($texto).'%':trim($texto); 
        $this->ExecuteSQL($this->Query, $this->PreparaCampos);
        return $this->ListarDadosAll();
    }
    


   // ########################################################################
   //                      METODOS DE PREPARAÇÃO
   // ########################################################################

	private function PreparaDados(array $dados)
	{  
        unset($this->PreparaCampos);
   		foreach($dados as $chave =>$valor){
			$this->PreparaCampos[':'.$chave] = (is_numeric($valor))? (int)$valor:(string)$valor;
        }
    } 


    private function PreparaCampos(array $campos)
	{
        unset($this->DadosCampos);
   		foreach($campos as $chave =>$valor){
			$this->DadosCampos[] =  $chave." = :".$chave;
        }
    }


     private function PreparaExtras(array $extras)
	{
        unset($this->DadosExtras);
   		foreach($extras as $chave =>$valor){
			$this->DadosExtras[] =  $chave."  ".$valor;
        }
    }      

}
?>