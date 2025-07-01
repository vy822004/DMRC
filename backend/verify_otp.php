<?php
session_start();

// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$otp = $data['otp'] ?? '';

// Validate input
if (!$email || !$otp) {
    echo json_encode(["success" => false, "message" => "Email and OTP are required."]);
    exit;
}

// Check if OTP session values exist
if (!isset($_SESSION['otp']) || !isset($_SESSION['otp_expiry'])) {
    echo json_encode(["success" => false, "message" => "OTP expired or not sent. Please try again."]);
    exit;
}

// Check if OTP is expired
if (time() > $_SESSION['otp_expiry']) {
    unset($_SESSION['otp']);
    unset($_SESSION['otp_expiry']);
    echo json_encode(["success" => false, "message" => "OTP has expired. Please request a new one."]);
    exit;
}

// Check if OTP matches
if ($_SESSION['otp'] == $otp) {
    // Clear OTP data
    unset($_SESSION['otp']);
    unset($_SESSION['otp_expiry']);

    echo json_encode(["success" => true, "message" => "OTP verified successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Incorrect OTP."]);
}
