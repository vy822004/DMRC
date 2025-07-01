<?php
// --- CORS HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// DB connection
$host = "localhost";
$port = 3308;
$user = "root";
$password = "";
$database = "DMRC";

$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Read input
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$inputPassword = trim($data['password'] ?? '');

if (!$email || !$inputPassword) {
    echo json_encode(["success" => false, "message" => "Missing email or password"]);
    exit();
}

// Check login
$stmt = $conn->prepare("SELECT vendor_id, company_name, email, password FROM Vendors WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $vendor = $result->fetch_assoc();

    if ($inputPassword === $vendor['password']) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "vendor" => [
                "id" => $vendor['vendor_id'],
                "company" => $vendor['company_name'],
                "email" => $vendor['email']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email not found"]);
}

$stmt->close();
$conn->close();
