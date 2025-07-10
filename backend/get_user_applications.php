<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

$user_id = $_GET['user_id'] ?? '';
$filter = $_GET['filter'] ?? 'total';

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Missing user ID"]);
    exit();
}

$sql = "SELECT Application_id, department, remarks,
        CASE 
          WHEN status0 = 'Rejected' OR status1 = 'Rejected' OR status2 = 'Rejected' THEN 'rejected'
          WHEN status0 = 'Approved' AND status1 = 'Approved' AND status2 = 'Approved' THEN 'approved'
          WHEN status0 = 'Pending' OR status1 = 'Pending' OR status2 = 'Pending' THEN 'pending'
          ELSE 'pending'
        END as status
        FROM application WHERE UserId = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$applications = [];
while ($row = $result->fetch_assoc()) {
    if ($filter === "total" || $row['status'] === $filter) {
        $applications[] = [
            "Application_id" => $row["Application_id"],
            "department" => $row["department"],
            "status" => $row["status"],
            "remark" => $row["remarks"] ?? ""
        ];
    }
}

echo json_encode(["success" => true, "data" => $applications]);
$conn->close();
?>
