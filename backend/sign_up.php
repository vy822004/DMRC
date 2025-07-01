<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"));

$email = $data->Email;
$phone = $data->Phone_Number;
$password = $data->Password;

$sql = "INSERT INTO Admin (Email, Phone_Number, Password) VALUES ('$email', '$phone', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>
