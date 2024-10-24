<?php
ini_set("display_errors", 1);
require './vendor/autoload.php';
require './cors.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$pusher = new Pusher\Pusher(
    $_ENV['PUSHER_KEY'],
    $_ENV['PUSHER_SECRET'],
    $_ENV['PUSHER_APP_ID'],
    array('cluster' => $_ENV['PUSHER_CLUSTER'], 'useTLS' => true)
);

if (!empty($_POST) && !empty($_POST['name']) && !empty($_POST['email'])) {
    $socket_id = $_POST['socket_id'];
    $user_id = $_POST['name'];
    $user_info = [
        "name" => $_POST['name'],
        "email" => $_POST['email'],
    ];    
    echo $pusher->authorizePresenceChannel("presence-menu-channel", $socket_id, $user_id, $user_info);    
} 
else {
    http_response_code(400);
    echo "Invalid POST data\n";
}
?>