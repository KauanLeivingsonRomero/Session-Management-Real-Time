<?php
ini_set("display_errors", 1);
require './vendor/autoload.php';
require './suporte.php';
require './cors.php';

// Carregar variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Instância de processo para interagir com o banco de dados
$exec = new Processo();

// Capturar o payload JSON recebido via POST
$data = json_decode(file_get_contents('php://input'), true);

// Verificar se os dados necessários foram enviados
if (isset($data['session_id']) && isset($data['session_time']) && isset($data['acompanhante'])) {
    $session_id = (int)$data['session_id'];
    $session_time = $data['session_time'];
    $acompanhante = $data['acompanhante']; // booleano: true ou false

    // Definir o incremento: 1 para participante sem acompanhante, 2 com acompanhante
    $increment = $acompanhante ? 2 : 1;

    // Prepara os campos para atualizar a tabela
    $campos = ['session_users' => $increment];

    // Usar a função setDados para incrementar no banco
    $exec->updateSession($increment, $session_id);

    // Notificar o Pusher sobre a mudança
    $pusher = new Pusher\Pusher(
        $_ENV['PUSHER_KEY'],
        $_ENV['PUSHER_SECRET'],
        $_ENV['PUSHER_APP_ID'],
        array('cluster' => $_ENV['PUSHER_CLUSTER'], 'useTLS' => true)
    );

    // Dados a serem enviados para o Pusher
    $pusher_data = [
      'session_id' => $session_id,
      'session_time' => $session_time,  
      'acompanhante' => $data['acompanhante']  
    ];

    $pusher->trigger('presence-menu-channel', 'client-consume', $pusher_data);

    // Retornar uma resposta de sucesso
    echo json_encode(['success' => true, 'message' => 'Sessão atualizada com sucesso']);
} else {
    // Retornar uma resposta de erro se os dados não forem fornecidos corretamente
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
}
?>
