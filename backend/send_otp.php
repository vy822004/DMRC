<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Make sure this path is correct

session_start(); // 🔸 IMPORTANT: Needed to store OTP for verification

// Allow CORS (adjust origin in production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit();
}

// Generate OTP
$otp = rand(100000, 999999);

// Store OTP and expiry in session
$_SESSION['otp'] = $otp;
$_SESSION['otp_expiry'] = time() + 300; // 5 minutes from now

$mail = new PHPMailer(true);

try {
    // SMTP setup
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'vy822004@gmail.com'; // ✅ Your Gmail
    $mail->Password = 'lyik mtvi qfdu ruvm'; // ✅ Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('vy822004@gmail.com', 'DMRC OTP'); // ✅ Must match Gmail
    $mail->addAddress($email);
    $mail->Subject = 'Your OTP for DMRC';
    $mail->Body    = "Your OTP is: $otp\nThis OTP will expire in 5 minutes.";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'OTP sent successfully']);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Mailer Error: ' . $mail->ErrorInfo
    ]);
}
