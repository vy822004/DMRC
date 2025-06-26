import React from 'react';
import { Link } from 'react-router-dom';

export default function Head() {
  return (
    <div className="bg-white shadow-md rounded-xl p-8 max-w-4xl mx-auto my-10 border border-gray-300">
      <h1 className="text-3xl font-bold text-[#c8102e] text-center mb-6 border-b pb-3">
        DMRC Department Head Portal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Architecture</h2>
           <Link to="/Arch_Applications" className="text-red-600 hover:underline">
              click
            </Link>

          <p className="text-sm">Review submitted architectural forms and approve or reject submissions. Coordinate with vendors on compliance and documentation.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Civil</h2>
          <p className="text-sm">Manage civil infrastructure reports, monitor project progress, and validate quality standards as per DMRC norms.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Electrical</h2>
          <p className="text-sm">Oversee electrical component integration, safety compliance, and power systems documentation.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Mechanical</h2>
          <p className="text-sm">Inspect mechanical components submitted by vendors, verify ISO and IS code attachments, and approve certified systems.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Telecom</h2>
          <p className="text-sm">Coordinate review of telecom hardware submissions, confirm signal compliance and integration with DMRC networks.</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Operations</h2>
          <p className="text-sm">Manage inter-departmental review status, finalize approval chains, and track vendor onboarding lifecycle.</p>
        </div>
      </div>
    </div>
  );
}
