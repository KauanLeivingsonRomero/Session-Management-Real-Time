<?php
session_start();
$id = (isset($_SESSION['id']))? $_SESSION['id'] : NULL;
unset($_SESSION);
session_destroy();

header('Location:../../index.php');
exit();
?>
