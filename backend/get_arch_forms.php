<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed", "error" => $conn->connect_error]);
    exit();
}

$sql = "SELECT * FROM Application WHERE department = 'Architecture'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $applications = [];
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
    echo json_encode(["success" => true, "data" => $applications]);
} else {
    echo json_encode(["success" => true, "data" => [], "message" => "No records found"]);
}

$conn->close();
?>
