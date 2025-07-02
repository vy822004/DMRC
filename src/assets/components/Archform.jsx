import React, { useState } from 'react';

const sections = [
  { id: 'A', title: 'General Information' },
  { id: 'B', title: 'Certifications & Origin' },
  { id: 'C', title: 'Compliance & DMRC Usage' },
];

export default function Archform() {
  const [currentSection, setCurrentSection] = useState('A');
  const [form, setForm] = useState({});
  const [fileInputs, setFileInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFileInputs({ ...fileInputs, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentSection !== 'C') return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("UserId", "12345456");
    formData.append("Department", "Architecture");

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    Object.entries(fileInputs).forEach(([key, file]) => file && formData.append(key, file));

    try {
      const response = await fetch("http://localhost/DMRC/arch.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert("✅ Form submitted successfully!");
        setForm({});
        setFileInputs({});
        setCurrentSection('A');
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (err) {
      alert("⚠️ Submission error");
      console.error(err);
    }
    setIsLoading(false);
  };

  const renderInput = (label, name, type = 'text', options = []) => (
    <div className="space-y-1">
      <label className="block font-medium text-sm text-gray-700">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={form[name] || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={form[name] || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          name={name}
          checked={form[name] || false}
          onChange={handleChange}
          className="mr-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name] || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          {...(type === 'number' ? {
            min: 0,
            onInput: (e) => {
              if (e.target.value < 0) e.target.value = 0;
            }
          } : {})}
        />
      )}
    </div>
  );

  const renderFile = (label, name) => (
    <div className="space-y-1">
      <label className="block font-medium text-sm text-gray-700">{label}</label>
      <input type="file" name={name} onChange={handleChange} className="w-full border p-2 rounded" />
      {fileInputs[name] && (
        <p className="text-sm text-green-600">Selected: {fileInputs[name].name}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-[#c8102e] mb-6">Architecture Form</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setCurrentSection(section.id)}
              className={`py-2 rounded border text-sm font-medium ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {currentSection === 'A' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section A - General Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput('Company Name', 'company_name')}
                {renderInput('Company Incorporation Date', 'incorporation_date', 'date')}
                {renderInput('Manufacturing Years', 'manufacturing_years', 'number')}
                {renderInput('Company Email', 'company_email')}
                {renderInput('Contact Details', 'contact_details')}
                {renderInput('Company Address', 'company_address', 'textarea')}
                {renderInput('Is Blacklisted till', 'is_blacklisted', 'date')}
              </div>
            </div>
          )}

          {currentSection === 'B' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section B - Certifications & Origin</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput('Material Category', 'material_category')}
                {renderInput('Material Origin', 'material_origin', 'select', ['India', 'Outside India'])}
                {renderInput('Production Capacity', 'production_capacity')}
                {renderInput('Life Span', 'lifespan', 'number')}
                {renderInput('IS Code', 'is_code')}
                {renderFile('IS Code File (PDF)', 'is_code_file')}
                {renderInput('ISO Certified?', 'iso_certified', 'checkbox')}
                {renderFile('ISO File', 'iso_file')}
                {renderInput('Validity of ISO Certificate', 'validity_iso_certificate', 'date')}
                {renderInput('Comply with International Codes', 'comply_with_international_codes','select', ['YES', 'NO'])}
                {renderInput('Accredited with NABL', 'accredited_with_NABL','select', ['YES', 'NO'])}
                {renderInput('Standard Test', 'standard_test')}
                {renderInput('Validity of Test', 'validity_of_test', 'date')}
                {renderFile('Attachment of Validity', 'attachment_of_validity')}
                {renderInput('Name of Laboratory', 'name_of_laboratory')}
                {renderInput('Test Name', 'test_name')}
                {renderFile('Attachment of Test', 'attachment_of_test')}
                {renderInput('Certified by International Lab', 'certified_by_international_lab')}
                {renderInput('Lab Name', 'lab_name')}
                {renderInput('Registered as Green Material', 'registered_as_green_material','select', ['YES', 'NO'])}
                {renderInput('SRI Value', 'SRI_value')}
                {renderInput('Application Area', 'application_area', 'select', ['Interior', 'Exterior', 'Both'])}
              </div>
            </div>
          )}

          {currentSection === 'C' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section C - Compliance & DMRC Usage</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput('Used in DMRC?', 'used_in_dmrc', 'checkbox')}
                {renderFile('DMRC Proof File', 'dmrc_proof_file')}
                {renderInput('Registered with Government', 'registered_with_government','select', ['YES', 'NO'])}
                {renderFile('Attachment of Registration', 'attachment_of_registration')}
                {renderInput('Contract Value', 'contract_value', 'text')}
                {renderInput('Already Executed with Government', 'already_executed_with_government','select', ['YES', 'NO'])}
              </div>
            </div>
          )}

          {currentSection === 'C' && (
            <div className="text-right">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          )}
        </form>

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

          {currentSection !== 'C' && (
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
      </div>
    </div>
  );
}
