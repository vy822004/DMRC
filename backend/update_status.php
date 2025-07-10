<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// DB connection
$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

// Read POST data
$application_id = $_POST['application_id'] ?? null;
$department = $_POST['department'] ?? '';
$role = $_POST['role'] ?? '';
$status = $_POST['status'] ?? '';
$remarks = $_POST['remarks'] ?? '';

if (!$application_id || !$department || !$role || !$status) {
    echo json_encode(["success" => false, "message" => "Missing required parameters"]);
    exit();
}

// Role to status field mapping
$role_to_status = [
    "elec_head" => "status0",
    "elec_1" => "status1",
    "elec_2" => "status2",
    "arch_head" => "status0",
    "arch_1" => "status1",
    "arch_2" => "status2"
];

if (!isset($role_to_status[$role])) {
    echo json_encode(["success" => false, "message" => "Unauthorized role"]);
    exit();
}

$status_field = $role_to_status[$role];

// Check if application exists
$check = $conn->prepare("SELECT * FROM application WHERE Application_id = ? AND department = ?");
$check->bind_param("is", $application_id, $department);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "No matching application found"
    ]);
    $check->close();
    $conn->close();
    exit();
}
$check->close();

// Update status and remarks
$update = $conn->prepare("UPDATE application SET `$status_field` = ?, `remarks` = ? WHERE Application_id = ? AND department = ?");
$update->bind_param("ssis", $status, $remarks, $application_id, $department);

if ($update->execute()) {
    echo json_encode(["success" => true, "message" => "Status updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update status"]);
}

$update->close();
$conn->close();
?>
