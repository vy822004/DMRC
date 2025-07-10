<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed", "error" => $conn->connect_error]);
    exit();
}

function saveFile($fileKey, $UserId, $uploadDir = "uploads/architecture/") {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) return null;

    $extension = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
    $safeLabel = preg_replace("/[^a-zA-Z0-9]/", "_", $fileKey);
    $newFileName = $UserId . "_" . $safeLabel . "." . $extension;

    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
    $targetFile = $uploadDir . $newFileName;

    if (move_uploaded_file($_FILES[$fileKey]["tmp_name"], $targetFile)) {
        return $newFileName;
    }

    return null;
}

function toBool($val) {
    return ($val === "true" || $val === true || $val === "1") ? 1 : 0;
}

// Get POST variables
$UserId = $_POST["UserId"];
$incorporation_date = $_POST["incorporation_date"];
$manufacturing_years = $_POST["manufacturing_years"];
$material_origin = $_POST["material_origin"];
$production_capacity = $_POST["production_capacity"];
$lifespan = $_POST["lifespan"];
$is_code = $_POST["is_code"];
$is_code_file = saveFile("is_code_file",$UserId);
$iso_certified = toBool($_POST["iso_certified"]);
$iso_file = saveFile("iso_file",$UserId);
$application_area = $_POST["application_area"];
$used_in_dmrc = toBool($_POST["used_in_dmrc"]);
$dmrc_proof_file = saveFile("dmrc_proof_file",$UserId);

$company_name = $_POST["company_name"];
$Department = $_POST["Department"];
$company_email = $_POST["company_email"];
$contact_details = $_POST["contact_details"];
$company_address = $_POST["company_address"];
$material_category = $_POST["material_category"];
$comply_with_international_codes = $_POST["comply_with_international_codes"];
$accredited_with_NABL = $_POST["accredited_with_NABL"];
$standard_test = $_POST["standard_test"];
$validity_of_test = $_POST["validity_of_test"];
$attachment_of_validity = saveFile("attachment_of_validity",$UserId);
$name_of_laboratory = $_POST["name_of_laboratory"];
$test_name = $_POST["test_name"];
$attachment_of_test = saveFile("attachment_of_test",$UserId);
$certified_by_international_lab = $_POST["certified_by_international_lab"];
$lab_name = $_POST["lab_name"];
$validity_iso_certificate = $_POST["validity_iso_certificate"];
$registered_as_green_material = $_POST["registered_as_green_material"];
$SRI_value = $_POST["SRI_value"];
$registered_with_government = $_POST["registered_with_government"];
$contract_value = $_POST["contract_value"];
$attachment_of_registration = saveFile("attachment_of_registration",$UserId);
$already_executed_with_government = $_POST["already_executed_with_government"];
$is_blacklisted = $_POST["is_blacklisted"];

$sql = "INSERT INTO Arcform (
    incorporation_date, manufacturing_years, material_origin, production_capacity, lifespan,
    is_code, is_code_file, iso_certified, iso_file, application_area,
    used_in_dmrc, dmrc_proof_file, UserId, company_name, Department,
    company_email, contact_details, company_address, material_category, comply_with_international_codes,
    accredited_with_NABL, standard_test, validity_of_test, attachment_of_validity, name_of_laboratory,
    test_name, attachment_of_test, certified_by_international_lab, lab_name, validity_iso_certificate,
    registered_as_green_material, SRI_value, registered_with_government, contract_value, attachment_of_registration,
    already_executed_with_government, is_blacklisted
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL Prepare failed", "error" => $conn->error]);
    exit();
}

$stmt->bind_param(
  "sisssisisssssssssssssssssssssssssssss",
  $incorporation_date, $manufacturing_years, $material_origin, $production_capacity, $lifespan,
  $is_code, $is_code_file, $iso_certified, $iso_file, $application_area,
  $used_in_dmrc, $dmrc_proof_file, $UserId, $company_name, $Department,
  $company_email, $contact_details, $company_address, $material_category, $comply_with_international_codes,
  $accredited_with_NABL, $standard_test, $validity_of_test, $attachment_of_validity, $name_of_laboratory,
  $test_name, $attachment_of_test, $certified_by_international_lab, $lab_name, $validity_iso_certificate,
  $registered_as_green_material, $SRI_value, $registered_with_government, $contract_value, $attachment_of_registration,
  $already_executed_with_government, $is_blacklisted
);

if ($stmt->execute()) {
    $applicationId = $conn->insert_id;

    // Insert into Application table
    $appSql = "INSERT INTO Application (department, Application_id, status0, status1, status2,UserId) 
               VALUES (?, ?, 'Pending', 'Pending', 'Pending',?)";
    $appStmt = $conn->prepare($appSql);

    if ($appStmt) {
        $appStmt->bind_param("sii", $Department, $applicationId,$UserId);
        if ($appStmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Data inserted successfully into Arcform and Application"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Arcform inserted, but Application insert failed",
                "error" => $appStmt->error
            ]);
        }
        $appStmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Arcform inserted, but Application prepare failed",
            "error" => $conn->error
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Arcform insert failed",
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
