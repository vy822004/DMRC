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
        // Applications approved by status0, pending at status1, not rejected at status2
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Approved' 
                AND status1 = 'Pending' 
                AND status2 != 'Rejected'";
        break;

    case 'approved':
        // Fully approved applications at all three levels
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Approved' 
                AND status1 = 'Approved' 
                AND status2 != 'Rejected'";
        break;

    case 'rejected':
        // Applications rejected at status1 after being approved at status0
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Approved' 
                AND (status1 = 'Rejected' OR status2 = 'Rejected')";;
        break;

    case 'total':
        // All applications that are not rejected at first level
        $sql = "SELECT * FROM application 
                WHERE department = 'Electrical' 
                AND status0 = 'Approved'";
        break;

    case 'dashboard':
    default:
        // Counts for dashboard
        $totalQuery = "SELECT COUNT(*) as count 
                       FROM application 
                       WHERE department = 'Electrical' 
                       AND status0 = 'Approved'";

        $pendingQuery = "SELECT COUNT(*) as count 
                         FROM application 
                         WHERE department = 'Electrical' 
                         AND status0 = 'Approved' 
                         AND status1 = 'Pending' 
                         AND status2 != 'Rejected'";

        $approvedQuery = "SELECT COUNT(*) as count 
                          FROM application 
                          WHERE department = 'Electrical' 
                          AND status0 = 'Approved' 
                          AND status1 = 'Approved' 
                          AND status2 != 'Rejected'";

        $rejectedQuery = "SELECT COUNT(*) as count 
                          FROM application 
                          WHERE department = 'Electrical' 
                          AND status0 = 'Approved' 
                          AND (status1 = 'Rejected' OR status2 = 'Rejected')";
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
        $conn->close();
        exit();
}

$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        "success" => true,
        "count" => count($data),
        "data" => $data
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Query failed"]);
}

$conn->close();
?>
