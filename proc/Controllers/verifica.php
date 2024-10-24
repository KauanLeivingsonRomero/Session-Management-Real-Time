<?php 
date_default_timezone_set('America/Recife');
session_start();
require_once "suporte.php";

//retorno do post
$email    = (isset($_POST['email']))?$_POST['email']:NULL;
$senha    = (isset($_POST['senha']))?$_POST['senha']:NULL;

//verifica se email e senha estão vazios
if(!empty($email) && !empty($senha)){

  $exec  = new Mysqlsan();//inicia o processo de conexão com base mysqli
  $dados = $exec->querys('id, usu_nome, usu_email', 'tb_usuario',3,0,$email,$senha);

  if(!empty($dados)){//se existir um registro
    
    $_SESSION['id']                =  $dados[0][0];
    $_SESSION['usu_nome']          =  $dados[0][1];
    $_SESSION['usu_email']         =  $dados[0][2];
  
    // $id     = (!empty($dados[0][0]))?base64_encode($dados[0][0]): NULL;
    // $nome   = (!empty($dados[0][1]))?base64_encode($dados[0][1]): NULL;
    // $email  = (!empty($dados[0][2]))?base64_encode($dados[0][2]): NULL;
    // $acesso = (!empty($dados[0][6]))?base64_encode($dados[0][6]): NULL;
    // $foto   = (!empty($dados[0][7]))?base64_encode($dados[0][7]): NULL;

    exit(header('Location: ../../subs.php'));
  }else{

        $num = base64_encode(1);
        exit(header('Location: ../../index.php?msg='.$num));
  }

}else{
        $num = base64_encode(2);
        exit(header('Location: ../../index.php?msg='.$num));
}


?>