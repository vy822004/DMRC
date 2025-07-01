import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const sections = [
  { id: 'A', title: 'General Information' },
  { id: 'B', title: 'Company Profile' },
  { id: 'C', title: 'References & Experience' },
];

export default function Elecform() {
  const [currentSection, setCurrentSection] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (currentSection !== 'C') return;

    setIsLoading(true);
    const formData = new FormData();

    for (const key in data) {
      if (data[key] instanceof FileList) {
        if (data[key].length > 0) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    formData.append('UserId', '123');

    try {
      const response = await axios.post('http://localhost/DMRC/elec.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(response.data.message);
      if (response.data.success) {
        reset();
        setCurrentSection('A');
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded shadow text-center mb-6">
          <h1 className="text-2xl font-bold text-center text-[#c8102e] mb-6">Electrical Form</h1>
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

        <form id="elecForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
          {/* Section A */}
          {currentSection === 'A' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section A - General Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[{ label: 'Details of Material/Product Proposed', type: 'textarea', name: 'materialDetails' },
                  { label: 'Name of Make', type: 'textarea', name: 'makeName' },
                  { label: 'Registered Office', type: 'textarea', name: 'manufacturerOffice' },
                  { label: 'Authorized Rep Name', type: 'text', name: 'authorizedRepName' },
                  { label: 'Designation', type: 'text', name: 'authorizedRepDesignation' },
                  { label: 'Contact Number', type: 'text', name: 'authorizedRepContact' },
                  { label: 'Email ID', type: 'email', name: 'authorizedRepEmail' },
                  { label: 'Power of Attorney (PDF)', type: 'file', name: 'powerOfAttorney' },
                  { label: 'Manufacturing Unit Address', type: 'textarea', name: 'manufacturingUnitAddress' },
                  { label: 'Ownership Documents', type: 'file', name: 'ownershipDocuments' },
                  { label: 'Total Land Area', type: 'text', name: 'totalLandArea' },
                  { label: 'Total Covered Area', type: 'text', name: 'totalCoveredArea' },
                  { label: 'Licensed Capacity', type: 'text', name: 'licensedCapacity' },
                  { label: 'Monthly Production Capacity', type: 'number', name: 'monthlyProductionCapacity' },
                  { label: 'Actual Production', type: 'number', name: 'actualProduction' }
                ].map((field, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="block font-medium text-sm">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea {...register(field.name)} className="w-full border p-2 rounded" />
                    ) : field.type === 'number' ? (
                      <input type="number" min="0" onInput={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                      }} {...register(field.name)} className="w-full border p-2 rounded" />
                    ) : (
                      <input type={field.type} {...register(field.name)} className="w-full border p-2 rounded" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section B */}
          {currentSection === 'B' && (
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-lg font-semibold">Section B - Company Profile & Experience</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label>Ownership Details</label>
                  <textarea {...register("ownershipDetails")} className="w-full border p-2 rounded" />
                </div>
                <div className="space-y-1">
                  <label>Registered in India?</label>
                  <select {...register("registeredInIndia")} className="w-full border p-2 rounded">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label>Registration Certificate</label>
                  <input type="file" {...register("registrationCertificate")} className="w-full border p-2 rounded" />
                </div>
                <div className="space-y-1">
                  <label>Years of Manufacturing Experience</label>
                  <input type="number" min="0" onInput={(e) => { if (e.target.value < 0) e.target.value = 0; }} {...register("manufacturingYears")} className="w-full border p-2 rounded" />
                </div>
                <div className="space-y-1">
                  <label>Organization Chart / Manpower</label>
                  <textarea {...register("organizationChart")} className="w-full border p-2 rounded" />
                </div>
                {["designFacility", "testingFacility", "rdFacility"].map((field, i) => (
                  <div className="space-y-1" key={field}>
                    <label>{["In-House Design Facility", "In-House Testing Facility", "R&D Facility"][i]}</label>
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

          {/* Section C */}
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
                    <h3 className="font-semibold">{base === 'purchaseOrder' ? 'Purchase Orders' : 'Performance Certificates'} (Upload 5)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="space-y-1">
                          <label>{`${base === 'purchaseOrder' ? 'Purchase Order' : 'Performance Certificate'} ${num}`}</label>
                          <input type="file" {...register(`${base}${num}`)} className="w-full border p-2 rounded" />
                        </div>
                      ))}
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
                  <div className="space-y-1">
                    <label>Proof</label>
                    <input type="file" {...register("dmrcProofFile")} className="w-full border p-2 rounded" />
                  </div>
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
        </form>

        {/* Navigation Buttons OUTSIDE form */}
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

          {currentSection === 'C' ? (
            <button
              type="submit"
              onClick={() => document.getElementById('elecForm').requestSubmit()}
              className="bg-blue-600 text-white px-6 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
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
