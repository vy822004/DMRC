<?php
$host = "localhost";
$port = 3308; // Make sure this is an integer, not a string
$user = "root";
$password = ""; // Leave empty if no password
$database = "DMRC";

// Create connection
$conn = new mysqli($host, $user, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Optional: Comment this out in production
// echo "Connected successfully to DMRC database!";
?>
