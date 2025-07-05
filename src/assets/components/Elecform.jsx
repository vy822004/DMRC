// Elecform.jsx (Part 1)
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserId = (parseInt(localStorage.getItem('UserId')));

const sections = [
  { id: 'A', title: 'General Information' },
  { id: 'B', title: 'Company Profile' },
  { id: 'C', title: 'References & Experience' },
  { id: 'D', title: 'Certifications & Documents' },
  { id: 'E', title: 'Financial & Testing Details' },
  { id: 'F', title: 'Usage History' },
];

export default function Elecform() {
  const [currentSection, setCurrentSection] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputs, setFileInputs] = useState({});
  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('elecform-data')) || {};
    const savedFiles = JSON.parse(localStorage.getItem('elecform-files')) || {};
    for (const key in savedData) setValue(key, savedData[key]);
    setFileInputs(savedFiles);
  }, [setValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = getValues();
      localStorage.setItem('elecform-data', JSON.stringify(currentValues));
      localStorage.setItem('elecform-files', JSON.stringify(fileInputs));
    }, 1000);
    return () => clearInterval(interval);
  }, [getValues, fileInputs]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFileInputs((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const renderFileInput = (label, name) => (
    <div className="space-y-1">
      <label className="block font-medium text-sm">{label}</label>
      <input type="file" name={name} onChange={handleFileChange} className="w-full border p-2 rounded" />
      {fileInputs[name] && (
        <p className="text-sm text-green-600">Selected: {fileInputs[name].name}</p>
      )}
    </div>
  );
` `
  const onSubmit = async (data) => {
    if (currentSection !== 'F') {
      console.warn("Form tried to submit outside of Section F");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    for (const key in fileInputs) formData.append(key, fileInputs[key]);
    formData.append('UserId', UserId);

    try {
      const response = await axios.post('http://localhost/DMRC/elec.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      if (response.data.success) {
        reset();
        setFileInputs({});
        localStorage.removeItem('elecform-data');
        localStorage.removeItem('elecform-files');
        setCurrentSection('A');
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded shadow text-center mb-6">
          <h1 className="text-2xl font-bold text-[#c8102e] mb-6">Electrical Form</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setCurrentSection(section.id)}
              className={`py-2 rounded border text-sm font-medium ${
                currentSection === section.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        
          

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
          {currentSection === 'A' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section A - General Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Details of Material/Product Proposed', name: 'materialDetails', type: 'textarea' },
                  { label: 'Name of Make', name: 'makeName', type: 'textarea' },
                  { label: 'Registered Office', name: 'manufacturerOffice', type: 'textarea' },
                  { label: 'Authorized Rep Name', name: 'authorizedRepName', type: 'text' },
                  { label: 'Designation', name: 'authorizedRepDesignation', type: 'text' },
                  { label: 'Contact Number', name: 'authorizedRepContact', type: 'text' },
                  { label: 'Email ID', name: 'authorizedRepEmail', type: 'email' },
                  { label: 'Manufacturing Unit Address', name: 'manufacturingUnitAddress', type: 'textarea' },
                  { label: 'Total Land Area', name: 'totalLandArea', type: 'text' },
                  { label: 'Total Covered Area', name: 'totalCoveredArea', type: 'text' },
                  { label: 'Licensed Capacity', name: 'licensedCapacity', type: 'text' },
                  { label: 'Monthly Production Capacity', name: 'monthlyProductionCapacity', type: 'number' },
                  { label: 'Actual Production', name: 'actualProduction', type: 'number' },
                ].map((field, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="block font-medium text-sm">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea {...register(field.name)} className="w-full border p-2 rounded" />
                    ) : (
                      <input
                        type={field.type}
                        {...register(field.name)}
                        className="w-full border p-2 rounded"
                        {...(field.type === 'number' && {
                          min: 0,
                          onInput: (e) => {
                            if (e.target.value < 0) e.target.value = 0;
                          },
                        })}
                      />
                    )}
                  </div>
                ))}
                {renderFileInput('Power of Attorney (PDF)', 'powerOfAttorney')}
                {renderFileInput('Ownership Documents', 'ownershipDocuments')}
              </div>
            </div>
          )}

          {currentSection === 'B' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section B - Company Profile</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label>Ownership Details</label>
                  <textarea {...register('ownershipDetails')} className="w-full border p-2 rounded" />
                </div>
                <div className="space-y-1">
                  <label>Registered in India?</label>
                  <select {...register('registeredInIndia')} className="w-full border p-2 rounded">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {renderFileInput('Registration Certificate', 'registrationCertificate')}
                <div className="space-y-1">
                  <label>Years of Manufacturing Experience</label>
                  <input
                    type="number"
                    min="0"
                    {...register('manufacturingYears')}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label>Organization Chart / Manpower</label>
                  <textarea {...register('organizationChart')} className="w-full border p-2 rounded" />
                </div>
                {['designFacility', 'testingFacility', 'rdFacility'].map((field, idx) => (
                  <div key={idx} className="space-y-1">
                    <label>{['Design Facility', 'Testing Facility', 'R&D Facility'][idx]}</label>
                    <select {...register(field)} className="w-full border p-2 rounded">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentSection === 'C' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section C - References & Experience</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label>Type/Model of Proposed Product</label>
                  <textarea {...register("productTypeModel")} className="w-full border p-2 rounded" />
                </div>
                {["purchaseOrder", "performanceCert"].map((base, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold">
                      {base === 'purchaseOrder' ? 'Purchase Orders' : 'Performance Certificates'} (Upload 5)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5].map((num) =>
                        renderFileInput(
                          `${base === 'purchaseOrder' ? 'Purchase Order' : 'Performance Certificate'} ${num}`,
                          `${base}${num}`
                        )
                      )}
                    </div>
                  </div>
                ))}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label>Used in DMRC?</label>
                    <select {...register("dmrcUsage")} className="w-full border p-2 rounded">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {renderFileInput("Proof", "dmrcProofFile")}
                  <div className="space-y-1">
                    <label>Blacklisted?</label>
                    <select {...register("blacklisted")} className="w-full border p-2 rounded">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'D' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section D - Certifications & Documents</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Details of Machinery & Facilities', name: 'Details_of_machinery_and_facilities_used_in_manufacturing' },
                  { label: 'Document of Details', name: 'Document_of_Details', type: 'file' },
                  { label: 'Quality Plan', name: 'quality_plan', type: 'file' },
                  { label: 'Independent Certification', name: 'Independent_certification' },
                  { label: 'Certificate of Independent Certification', name: 'certificate_of_independent_certification', type: 'file' },
                  { label: 'Reference Number', name: 'Reference_Number' },
                  { label: 'Date of Issuance', name: 'Date_of_issuance', type: 'date' },
                  { label: 'Certificate Issued By', name: 'Certificate_issued_by' },
                  { label: 'Validity of Certificate', name: 'Validity_of_certificate', type: 'date' },
                ].map((field, idx) =>
                  field.type === 'file'
                    ? renderFileInput(field.label, field.name)
                    : (
                      <div key={idx} className="space-y-1">
                        <label>{field.label}</label>
                        <input type={field.type || 'text'} {...register(field.name)} className="w-full border p-2 rounded" />
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {currentSection === 'E' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section E - Financial & Testing</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Measures to Reduce Energy Consumption', name: 'Measures_to_reduce_energy_consumption', type: 'text' },
                  { label: 'Document of Measures', name: 'Document_of_measures', type: 'file' },
                  { label: 'Test Conducted in External Facility', name: 'Test_conducted_in_external_facility', type: 'select' },
                  { label: 'Net Worth', name: 'Net_worth_of_manufacturer', type: 'text' },
                  { label: 'GST Registration', name: 'GST_registration', type: 'text' },
                  { label: 'Profitability', name: 'Profitability', type: 'text' },
                  { label: 'Liquidity', name: 'Liquidity_of_manufacturer', type: 'text' },
                  { label: 'Turnover', name: 'Turnover_of_manufacturer', type: 'text' },
                  { label: "Banker's Solvency Certificate", name: "Bankers_solvency_certificate", type: 'file' },
                  { label: 'Test Report from Accredited Lab', name: 'Test_report_from_an_accredited_lab', type: 'select' },
                  { label: 'Certificate of Accredited Lab', name: 'Certificate_of_accredited_lab', type: 'file' },
                  { label: 'Certification of Proposed Model', name: 'Certification_of_proposed_model', type: 'file' },
                  { label: 'Test Certificate as per Standard', name: 'Test_certificate_as_per_relevant_standard', type: 'file' },
                ].map((field, idx) =>
                  field.type === 'select' ? (
                    <div key={idx} className="space-y-1">
                      <label>{field.label}</label>
                      <select {...register(field.name)} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  ) : field.type === 'file' ? (
                    <div key={idx}>{renderFileInput(field.label, field.name)}</div>
                  ) : (
                    <div key={idx} className="space-y-1">
                      <label>{field.label}</label>
                      <input type="text" {...register(field.name)} className="w-full border p-2 rounded" />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
           {currentSection === 'F' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section F - Usage History</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Used in any Other Organisation', name: 'Used_in_any_other_organisation', type: 'select' },
                  { label: 'Certificate of Usage', name: 'Certificate_of_usage', type: 'file' },
                  { label: 'Used in Central or State Project', name: 'Used_in_any_central_or_state_project', type: 'select' },
                  { label: 'Proof of Central/State Usage', name: 'proof_of_central_or_state_usage', type: 'file' }
                ].map((field, idx) =>
                  field.type === 'select' ? (
                    <div key={idx} className="space-y-1">
                      <label>{field.label}</label>
                      <select {...register(field.name)} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  ) : (
                    renderFileInput(field.label, field.name)
                  )
                )}
              </div>
            </div>
          )}
        

         

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => {
                const idx = sections.findIndex(s => s.id === currentSection);
                if (idx > 0) setCurrentSection(sections[idx - 1].id);
              }}
              disabled={currentSection === 'A'}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Previous
            </button>
            {currentSection === 'F' && (
  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded"
    disabled={isLoading}
  >
    {isLoading ? 'Submitting...' : 'Submit'}
  </button>
)}

            {currentSection !== 'F' && (
  <button
    type="button"
    onClick={() => {
      const idx = sections.findIndex(s => s.id === currentSection);
      if (idx < sections.length - 1) setCurrentSection(sections[idx + 1].id);
    }}
    className="bg-blue-600 text-white px-6 py-2 rounded"
  >
    Next
  </button>
)}
              

          </div>

            
        </form>
      </div>
    </div>
  );
}
