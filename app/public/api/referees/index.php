<?php
require 'class/DbConnection.php';

// Step 1
$db = DbConnection::getConnection();

// Step 2
$sql = 'SELECT * FROM referees';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$referees = $stmt->fetchAll();

// Step 3
$json = json_encode($referees, JSON_PRETTY_PRINT);

// Step 4
header('Content-Type: application/json');
echo $json;