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

$filter = isset($_GET['filter']) ? $_GET['filter'] : 'dashboard';
$data = [];
$count = 0;

switch ($filter) {
    case 'pending':
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Pending' 
                AND status1 != 'Rejected' 
                AND status2 != 'Rejected'";
        break;

    case 'approved':
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Approved' 
                AND status1 != 'Rejected' 
                AND status2 != 'Rejected'";
        break;

    case 'rejected':
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND (
                    status0 = 'Rejected' 
                    OR status1 = 'Rejected' 
                    OR status2 = 'Rejected'
                )";
        break;

    case 'total':
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical'";
        break;

    case 'dashboard':
    default:
        // Separate queries to get individual counts
        $totalQuery = "SELECT COUNT(*) as count FROM application WHERE department = 'Electrical'";
        $pendingQuery = "SELECT COUNT(*) as count FROM application WHERE department = 'Electrical' AND status0 = 'Pending' AND status1 != 'Rejected' AND status2 != 'Rejected'";
        $approvedQuery = "SELECT COUNT(*) as count FROM application WHERE department = 'Electrical' AND status0 = 'Approved' AND status1 != 'Rejected' AND status2 != 'Rejected'";
        $rejectedQuery = "SELECT COUNT(*) as count FROM application WHERE department = 'Electrical' AND (status0 = 'Rejected' OR status1 = 'Rejected' OR status2 = 'Rejected')";

        $totalCount = $conn->query($totalQuery)->fetch_assoc()['count'];
        $pendingCount = $conn->query($pendingQuery)->fetch_assoc()['count'];
        $approvedCount = $conn->query($approvedQuery)->fetch_assoc()['count'];
        $rejectedCount = $conn->query($rejectedQuery)->fetch_assoc()['count'];

        echo json_encode([
            "success" => true,
            "totalCount" => $totalCount,
            "pendingCount" => $pendingCount,
            "approvedCount" => $approvedCount,
            "rejectedCount" => $rejectedCount,
        ]);
        exit();
}

$result = $conn->query($sql);

if ($result) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $count = count($data);

    echo json_encode([
        "success" => true,
        "count" => $count,
        "data" => $data
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Query failed"]);
}

$conn->close();
?>
