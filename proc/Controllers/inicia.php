<?php
    
    // ini_set("display_errors", 1);
    require "suporte.php";
    require './vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $exec = new Processo();

    $options = array(
    'cluster' => $_ENV['PUSHER_CLUSTER'],
    'useTLS' => true
    );

    $pusher = new Pusher\Pusher(
        $_ENV['PUSHER_KEY'],
        $_ENV['PUSHER_SECRET'],
        $_ENV['PUSHER_APP_ID'],
        $options
    );  

    $data['message'] = 'Quiz iniciado';
    $pusher->trigger('presence-client-channel-game-' . $_GET['game_id'], 'my-event', $data);
    $exec->setDados(array('game_started' => 'SIM'), "tb_game", 'game_id', $_GET['game_id']);
    header("Location: ../../questions.php");

?>