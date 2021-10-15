<?php
require 'class/DbConnection.php';

// Step 1
$db = DbConnection::getConnection();

// Step 2
$sql = 'SELECT * FROM referee';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$books = $stmt->fetchAll();

// Step 3
$json = json_encode($books, JSON_PRETTY_PRINT);

// Step 4
header('Content-Type: application/json');
echo $json;