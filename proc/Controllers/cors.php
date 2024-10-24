<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // You can specify allowed origins here
    $allowed_origins = ['http://localhost:3000'];
    if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    }
}

// Allow credentials if needed
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // May also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: " . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
    }

    exit(0);
}
?>