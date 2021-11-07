<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");


// Step 1
$db = DbConnection::getConnection();

// Step 2
$stmt = $db->prepare(
  'DELETE FROM games WHERE gameid = ?'
);
$stmt->execute([
    $_POST['gameid']
  ]);

header('HTTP/1.1 303 See Other');
header('Location: ../games/');