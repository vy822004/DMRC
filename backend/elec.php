<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$user = "root";
$password = "";
$db = "dmrc";
$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

function saveFile($fieldName, $UserId, $label) {
    $uploadDir = "uploads/electrical/";

    if (!isset($_FILES[$fieldName]) || $_FILES[$fieldName]['error'] !== UPLOAD_ERR_OK) return null;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Create if not exists
    }

    $ext = pathinfo($_FILES[$fieldName]['name'], PATHINFO_EXTENSION);
    $filename = $UserId . "_" . $label . "." . $ext;
    $path = $uploadDir . $filename;
    move_uploaded_file($_FILES[$fieldName]['tmp_name'], $path);
    return $filename;
}

$UserId = $_POST['UserId'];
$materialDetails = $_POST['materialDetails'];
$makeName = $_POST['makeName'];
$manufacturerOffice = $_POST['manufacturerOffice'];
$authorizedRepName = $_POST['authorizedRepName'];
$authorizedRepDesignation = $_POST['authorizedRepDesignation'];
$authorizedRepContact = $_POST['authorizedRepContact'];
$authorizedRepEmail = $_POST['authorizedRepEmail'];
$manufacturingUnitAddress = $_POST['manufacturingUnitAddress'];
$totalLandArea = $_POST['totalLandArea'];
$totalCoveredArea = $_POST['totalCoveredArea'];
$licensedCapacity = $_POST['licensedCapacity'];
$monthlyProductionCapacity = $_POST['monthlyProductionCapacity'];
$actualProduction = $_POST['actualProduction'];
$ownershipDetails = $_POST['ownershipDetails'];
$registeredInIndia = $_POST['registeredInIndia'];
$manufacturingYears = $_POST['manufacturingYears'];
$organizationChart = $_POST['organizationChart'];
$designFacility = $_POST['designFacility'];
$testingFacility = $_POST['testingFacility'];
$rdFacility = $_POST['rdFacility'];
$productTypeModel = $_POST['productTypeModel'];
$dmrcUsage = $_POST['dmrcUsage'];
$blacklisted = $_POST['blacklisted'];

$powerOfAttorney = saveFile("powerOfAttorney", $UserId, "powerOfAttorney");
$ownershipDocuments = saveFile("ownershipDocuments", $UserId, "ownershipDocuments");
$registrationCertificate = saveFile("registrationCertificate", $UserId, "registrationCertificate");
$dmrcProofFile = saveFile("dmrcProofFile", $UserId, "dmrcProofFile");

$purchaseOrders = [];
for ($i = 1; $i <= 5; $i++) {
    $purchaseOrders[$i] = saveFile("purchaseOrder$i", $UserId, "PO$i");
}

$performanceCerts = [];
for ($i = 1; $i <= 5; $i++) {
    $performanceCerts[$i] = saveFile("performanceCert$i", $UserId, "PC$i");
}

$sql = "INSERT INTO Elecform (
    UserId, materialDetails, makeName, manufacturerOffice, authorizedRepName, authorizedRepDesignation, authorizedRepContact, authorizedRepEmail,
    powerOfAttorney, manufacturingUnitAddress, ownershipDocuments, totalLandArea, totalCoveredArea, licensedCapacity, monthlyProductionCapacity,
    actualProduction, ownershipDetails, registeredInIndia, registrationCertificate, manufacturingYears, organizationChart, designFacility,
    testingFacility, rdFacility, productTypeModel, purchaseOrder1, purchaseOrder2, purchaseOrder3, purchaseOrder4, purchaseOrder5,
    performanceCert1, performanceCert2, performanceCert3, performanceCert4, performanceCert5, dmrcUsage, dmrcProofFile, blacklisted
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssssssssssssssssssssssssssssssssssss",
    $UserId, $materialDetails, $makeName, $manufacturerOffice, $authorizedRepName, $authorizedRepDesignation, $authorizedRepContact, $authorizedRepEmail,
    $powerOfAttorney, $manufacturingUnitAddress, $ownershipDocuments, $totalLandArea, $totalCoveredArea, $licensedCapacity, $monthlyProductionCapacity,
    $actualProduction, $ownershipDetails, $registeredInIndia, $registrationCertificate, $manufacturingYears, $organizationChart, $designFacility,
    $testingFacility, $rdFacility, $productTypeModel,
    $purchaseOrders[1], $purchaseOrders[2], $purchaseOrders[3], $purchaseOrders[4], $purchaseOrders[5],
    $performanceCerts[1], $performanceCerts[2], $performanceCerts[3], $performanceCerts[4], $performanceCerts[5],
    $dmrcUsage, $dmrcProofFile, $blacklisted
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Form submitted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
