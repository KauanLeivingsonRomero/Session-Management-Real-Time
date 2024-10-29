<?php
ini_set("display_errors", 1);
require './vendor/autoload.php';
require './suporte.php';
require './cors.php';
$exec = new Processo();

$sessions = $exec->lista('session_id, session_time, session_users', 'tb_sessions');

echo json_encode($sessions)

?>