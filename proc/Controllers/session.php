<?php
ini_set("display_errors", 1);
require './vendor/autoload.php';
require './suporte.php';
require './cors.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$exec = new Processo();
// $data = json_decode(file_get_contents('php://input'), true);

$sessions = $exec->lista('session_id, session_time, session_users', 'tb_sessions');

// var_dump($sessions);

$pusher = new Pusher\Pusher(
    $_ENV['PUSHER_KEY'],
    $_ENV['PUSHER_SECRET'],
    $_ENV['PUSHER_APP_ID'],
    array('cluster' => $_ENV['PUSHER_CLUSTER'], 'useTLS' => true)
);


echo json_encode($sessions)


?>