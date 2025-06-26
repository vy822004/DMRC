import React, { useState } from 'react';

export default function Civilform() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend call - frontend only
    alert('Form submitted (frontend only)');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto my-10 border border-gray-300"
    >
      <h1 className="text-3xl font-bold text-[#c8102e] text-center mb-6 border-b pb-3">
        Civil Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 1 */}
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
            name="manufacturingYears"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            required
          />
        </div>

        {/* Row 2 */}
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

        {/* Row 3 */}
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

        {/* Row 4 */}
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

        {/* Row 5 */}
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
