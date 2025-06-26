import React, { useState } from 'react';

export default function Arcform() {
  const [form, setForm] = useState({});
  const [fileInputs, setFileInputs] = useState({});

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

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Object.entries(fileInputs).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    try {
      const response = await fetch("http://localhost/DMRC/arch.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        alert("✅ Form submitted successfully!");
      } else {
        alert("❌ Submission failed: " + result.message + (result.error ? `\nDetails: ${result.error}` : ""));
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("⚠️ Error submitting form. Check your server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto my-10 border border-gray-300"
    >
      <h1 className="text-3xl font-bold text-[#c8102e] text-center mb-6 border-b pb-3">
        Architecture Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-gray-700">
            Company Incorporation Date
          </label>
          <input
            type="date"
            name="incorporationDate"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Manufacturing Years
          </label>
          <input
            type="number"
            min={0}
            name="manufacturingYears"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Material Origin
          </label>
          <select
            name="materialOrigin"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="">Select</option>
            <option value="India">India</option>
            <option value="Outside India">Outside India</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Production Capacity
          </label>
          <input
            type="text"
            name="productionCapacity"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Life Span (Years)
          </label>
          <input
            type="number"
            name="lifespan"
            min={0}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            IS Code Compliance
          </label>
          <input
            type="text"
            name="isCode"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Upload IS Code Certificate
          </label>
          <input
            type="file"
            name="isCodeFile"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isoCertified"
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold text-gray-700">
            ISO Certified?
          </label>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Upload ISO Certificate
          </label>
          <input
            type="file"
            name="isoFile"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Application Area
          </label>
          <select
            name="applicationArea"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="">Select</option>
            <option value="Interior">Interior</option>
            <option value="Exterior">Exterior</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="usedInDMRC"
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold text-gray-700">
            Used in DMRC Projects?
          </label>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Upload Work Order / Proof
          </label>
          <input
            type="file"
            name="dmrcProof"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-[#c8102e] hover:bg-[#a40d24] text-white font-bold py-2 px-4 rounded"
      >
        Submit Form
      </button>
    </form>
  );
}
