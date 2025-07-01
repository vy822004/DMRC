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
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Application ID not provided"]);
    exit();
}

$appId = $_GET['id'];

// Query using only Application_id (case-sensitive)
$sql = "SELECT * FROM Arcform WHERE Application_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $appId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $application = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $application]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No application found with this ID",
        "id_provided" => $appId
    ]);
}

$conn->close();
?>
