<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// DB connection
$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required = ['email', 'password', 'contactPerson', 'companyName', 'phone', 'pan', 'gstin', 'legalStructure', 'address'];
foreach ($required as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing field: $field"]);
        exit;
    }
}

// Sanitize & prepare
$email = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$contact_person = $conn->real_escape_string($data['contactPerson']);
$company_name = $conn->real_escape_string($data['companyName']);
$phone = $conn->real_escape_string($data['phone']);
$pan = strtoupper($conn->real_escape_string($data['pan']));
$gstin = strtoupper($conn->real_escape_string($data['gstin']));
$legal_structure = $conn->real_escape_string($data['legalStructure']);
$address = $conn->real_escape_string($data['address']);
$role = 'vendor'; // default role

// Check if email already exists
$checkQuery = "SELECT UserId FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["success" => false, "message" => "Email already registered"]);
    $checkStmt->close();
    $conn->close();
    exit;
}
$checkStmt->close();

// Insert user
$insertQuery = "INSERT INTO users (email, password, contact_person, company_name, phone, pan, gstin, legal_structure, address, role)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($insertQuery);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssssssss", $email, $password, $contact_person, $company_name, $phone, $pan, $gstin, $legal_structure, $address, $role);

if ($stmt->execute()) {
    $userId = $conn->insert_id; // Get the last inserted UserId
    echo json_encode([
        "success" => true,
        "message" => "User registered successfully.",
        "UserId" => $userId,
        "role" => $role
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Registration failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
