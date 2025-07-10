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
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
    $ext = pathinfo($_FILES[$fieldName]['name'], PATHINFO_EXTENSION);
    $filename = $UserId . "_" . $label . "." . $ext;
    $path = $uploadDir . $filename;
    move_uploaded_file($_FILES[$fieldName]['tmp_name'], $path);
    return $filename;
}

// Section A–C
$UserId = $_POST['UserId'];
$Department = "Electrical";
$company_name ="NULL";
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

// Section D
$Details_of_machinery_and_facilities_used_in_manufacturing = $_POST['Details_of_machinery_and_facilities_used_in_manufacturing'];
$Independent_certification = $_POST['Independent_certification'];
$Reference_Number = $_POST['Reference_Number'];
$Date_of_issuance = $_POST['Date_of_issuance'];
$Certificate_issued_by = $_POST['Certificate_issued_by'];
$Validity_of_certificate = $_POST['Validity_of_certificate'];

$Document_of_Details = saveFile("Document_of_Details", $UserId, "DocumentDetails");
$quality_plan = saveFile("quality_plan", $UserId, "QualityPlan");
$certificate_of_independent_certification = saveFile("certificate_of_independent_certification", $UserId, "CertificateIndCert");

// Section E
$Measures_to_reduce_energy_consumption = $_POST['Measures_to_reduce_energy_consumption'];
$Test_conducted_in_external_facility = $_POST['Test_conducted_in_external_facility'];
$Net_worth_of_manufacturer = $_POST['Net_worth_of_manufacturer'];
$GST_registration = $_POST['GST_registration'];
$Profitability = $_POST['Profitability'];
$Liquidity_of_manufacturer = $_POST['Liquidity_of_manufacturer'];
$Turnover_of_manufacturer = $_POST['Turnover_of_manufacturer'];
$Test_report_from_an_accredited_lab = $_POST['Test_report_from_an_accredited_lab'];

$Document_of_measures = saveFile("Document_of_measures", $UserId, "DocMeasures");
$Bankers_solvency_certificate = saveFile("Bankers_solvency_certificate", $UserId, "BankerSolvency");
$Certificate_of_accredited_lab = saveFile("Certificate_of_accredited_lab", $UserId, "CertAccredLab");
$Certification_of_proposed_model = saveFile("Certification_of_proposed_model", $UserId, "CertProposedModel");
$Test_certificate_as_per_relevant_standard = saveFile("Test_certificate_as_per_relevant_standard", $UserId, "TestCertStandard");

// Section F
$Used_in_any_other_organisation = $_POST['Used_in_any_other_organisation'];
$Used_in_any_central_or_state_project = $_POST['Used_in_any_central_or_state_project'];

$Certificate_of_usage = saveFile("Certificate_of_usage", $UserId, "UsageCert");
$proof_of_central_or_state_usage = saveFile("proof_of_central_or_state_usage", $UserId, "ProofCentralState");

// Files from A–C
$powerOfAttorney = saveFile("powerOfAttorney", $UserId, "powerOfAttorney");
$ownershipDocuments = saveFile("ownershipDocuments", $UserId, "ownershipDocuments");
$registrationCertificate = saveFile("registrationCertificate", $UserId, "registrationCertificate");
$dmrcProofFile = saveFile("dmrcProofFile", $UserId, "dmrcProofFile");

$purchaseOrders = [];
$performanceCerts = [];
for ($i = 1; $i <= 5; $i++) {
    $purchaseOrders[$i] = saveFile("purchaseOrder$i", $UserId, "PO$i");
    $performanceCerts[$i] = saveFile("performanceCert$i", $UserId, "PC$i");
}

// SQL Insert with all fields
$sql = "INSERT INTO Elecform (
    UserId, materialDetails, makeName, manufacturerOffice, authorizedRepName, authorizedRepDesignation,
    authorizedRepContact, authorizedRepEmail, powerOfAttorney, manufacturingUnitAddress, ownershipDocuments,
    totalLandArea, totalCoveredArea, licensedCapacity, monthlyProductionCapacity, actualProduction,
    ownershipDetails, registeredInIndia, registrationCertificate, manufacturingYears, organizationChart,
    designFacility, testingFacility, rdFacility, productTypeModel, purchaseOrder1, purchaseOrder2,
    purchaseOrder3, purchaseOrder4, purchaseOrder5, performanceCert1, performanceCert2, performanceCert3,
    performanceCert4, performanceCert5, dmrcUsage, dmrcProofFile, blacklisted, 
    Details_of_machinery_and_facilities_used_in_manufacturing, Document_of_Details, quality_plan,
    Independent_certification, certificate_of_independent_certification, Reference_Number, Date_of_issuance,
    Certificate_issued_by, Validity_of_certificate, Measures_to_reduce_energy_consumption, Document_of_measures,
    Test_conducted_in_external_facility, Net_worth_of_manufacturer, GST_registration, Profitability,
    Liquidity_of_manufacturer, Turnover_of_manufacturer, Bankers_solvency_certificate,
    Test_report_from_an_accredited_lab, Certificate_of_accredited_lab, Certification_of_proposed_model,
    Test_certificate_as_per_relevant_standard, Used_in_any_other_organisation, Certificate_of_usage,
    Used_in_any_central_or_state_project, proof_of_central_or_state_usage,
    company_name, Department
) VALUES (" . str_repeat('?,', 65) . "?)"; // ✅ 66 placeholders

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param(str_repeat('s', 66), // ✅ 66 bind values
    $UserId, $materialDetails, $makeName, $manufacturerOffice, $authorizedRepName, $authorizedRepDesignation, $authorizedRepContact, $authorizedRepEmail,
    $powerOfAttorney, $manufacturingUnitAddress, $ownershipDocuments, $totalLandArea, $totalCoveredArea, $licensedCapacity, $monthlyProductionCapacity,
    $actualProduction, $ownershipDetails, $registeredInIndia, $registrationCertificate, $manufacturingYears, $organizationChart, $designFacility,
    $testingFacility, $rdFacility, $productTypeModel,
    $purchaseOrders[1], $purchaseOrders[2], $purchaseOrders[3], $purchaseOrders[4], $purchaseOrders[5],
    $performanceCerts[1], $performanceCerts[2], $performanceCerts[3], $performanceCerts[4], $performanceCerts[5],
    $dmrcUsage, $dmrcProofFile, $blacklisted,
    $Details_of_machinery_and_facilities_used_in_manufacturing, $Document_of_Details, $quality_plan, $Independent_certification,
    $certificate_of_independent_certification, $Reference_Number, $Date_of_issuance, $Certificate_issued_by, $Validity_of_certificate,
    $Measures_to_reduce_energy_consumption, $Document_of_measures, $Test_conducted_in_external_facility, $Net_worth_of_manufacturer,
    $GST_registration, $Profitability, $Liquidity_of_manufacturer, $Turnover_of_manufacturer,
    $Bankers_solvency_certificate, $Test_report_from_an_accredited_lab, $Certificate_of_accredited_lab, $Certification_of_proposed_model,
    $Test_certificate_as_per_relevant_standard, $Used_in_any_other_organisation, $Certificate_of_usage,
    $Used_in_any_central_or_state_project, $proof_of_central_or_state_usage,
    $company_name, $Department
);

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL prepare failed: " . $conn->error]);
    exit;
}


$stmt->bind_param(str_repeat('s', 66), // ✅ 66 bind values
    $UserId, $materialDetails, $makeName, $manufacturerOffice, $authorizedRepName, $authorizedRepDesignation, $authorizedRepContact, $authorizedRepEmail,
    $powerOfAttorney, $manufacturingUnitAddress, $ownershipDocuments, $totalLandArea, $totalCoveredArea, $licensedCapacity, $monthlyProductionCapacity,
    $actualProduction, $ownershipDetails, $registeredInIndia, $registrationCertificate, $manufacturingYears, $organizationChart, $designFacility,
    $testingFacility, $rdFacility, $productTypeModel,
    $purchaseOrders[1], $purchaseOrders[2], $purchaseOrders[3], $purchaseOrders[4], $purchaseOrders[5],
    $performanceCerts[1], $performanceCerts[2], $performanceCerts[3], $performanceCerts[4], $performanceCerts[5],
    $dmrcUsage, $dmrcProofFile, $blacklisted,
    $Details_of_machinery_and_facilities_used_in_manufacturing, $Document_of_Details, $quality_plan, $Independent_certification,
    $certificate_of_independent_certification, $Reference_Number, $Date_of_issuance, $Certificate_issued_by, $Validity_of_certificate,
    $Measures_to_reduce_energy_consumption, $Document_of_measures, $Test_conducted_in_external_facility, $Net_worth_of_manufacturer,
    $GST_registration, $Profitability, $Liquidity_of_manufacturer, $Turnover_of_manufacturer,
    $Bankers_solvency_certificate, $Test_report_from_an_accredited_lab, $Certificate_of_accredited_lab, $Certification_of_proposed_model,
    $Test_certificate_as_per_relevant_standard, $Used_in_any_other_organisation, $Certificate_of_usage,
    $Used_in_any_central_or_state_project, $proof_of_central_or_state_usage,
    $company_name, $Department
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
                "message" => "Data inserted successfully into Elecform and Application"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Elecform inserted, but Application insert failed",
                "error" => $appStmt->error
            ]);
        }
        $appStmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Elecform inserted, but Application prepare failed",
            "error" => $conn->error
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Elecform insert failed",
        "error" => $stmt->error
    ]);
}


$stmt->close();
$conn->close();
?>
