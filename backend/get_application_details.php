<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

// Read GET parameters
$application_id = $_GET['application_id'] ?? null;
$department = $_GET['department'] ?? null;

if (!$application_id || !$department) {
    echo json_encode(["success" => false, "message" => "Missing application_id or department"]);
    exit;
}

// Determine table based on department
$form_table = '';
if ($department === "Electrical") {
    $form_table = 'Elecform';
} elseif ($department === "Architecture") {
    $form_table = 'Archform';
} else {
    echo json_encode(["success" => false, "message" => "Invalid department"]);
    exit;
}

// Fetch form details
$form_stmt = $conn->prepare("SELECT * FROM `$form_table` WHERE Application_id = ?");
$form_stmt->bind_param("i", $application_id);
$form_stmt->execute();
$form_result = $form_stmt->get_result();

if ($form_result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Application data not found in $form_table"]);
    exit;
}

$form_data = $form_result->fetch_assoc();
$form_stmt->close();

// Fetch approval statuses from application table
$app_stmt = $conn->prepare("SELECT status0, status1, status2, remarks FROM application WHERE Application_id = ? AND department = ?");
$app_stmt->bind_param("is", $application_id, $department);
$app_stmt->execute();
$app_result = $app_stmt->get_result();

$application_meta = [];
if ($app_result->num_rows > 0) {
    $application_meta = $app_result->fetch_assoc();
}
$app_stmt->close();

// Fetch all remarks from remarks table
$remark_stmt = $conn->prepare("SELECT role, remark AS text, created_at AS date FROM remarks WHERE application_id = ? AND department = ? ORDER BY created_at DESC");
$remark_stmt->bind_param("is", $application_id, $department);
$remark_stmt->execute();
$remark_result = $remark_stmt->get_result();

$remarks = [];
while ($row = $remark_result->fetch_assoc()) {
    $remarks[] = $row;
}
$remark_stmt->close();

// Send combined response
echo json_encode([
    "success" => true,
    "application" => $form_data,
    "status" => $application_meta,
    "remarks" => $remarks
]);
?>
