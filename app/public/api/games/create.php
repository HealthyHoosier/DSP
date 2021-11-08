<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} 

catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2
$stmt = $db->prepare(
  'INSERT INTO games(gameHost,gameVisitor, gameDate, gameTime, gameType)
VALUES (?, ?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['gameHost'],
  $_POST['gameVisitor'],
  $_POST['gameDate'],
  $_POST['gameTime'],
  $_POST['gameType']
  
]);

// Step 4: Output
header('HTTP/1.1 303 See Other');
header('Location: ../games/');