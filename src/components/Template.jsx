import React from "react";

const CertificateTemplate = ({ userName, courseName }) => {
  return (
    <div className="w-full max-w-3xl mx-auto border-4 border-gray-800 p-6 bg-white shadow-xl text-center">
      <h1 className="text-4xl font-bold text-gray-900">Certificate of Completion</h1>
      <p className="text-lg text-gray-700 mt-2">This is to certify that</p>

      <h2 className="text-3xl font-semibold text-blue-600 mt-2">{userName}</h2>

      <p className="text-lg text-gray-700 mt-2">
        has successfully completed the course
      </p>

      <h3 className="text-2xl font-semibold text-green-700 mt-2">{courseName}</h3>

      <div className="flex justify-between mt-6 px-6">
        <div>
          <p className="text-sm text-gray-600">Issued on:</p>
          <p className="text-lg font-semibold">{new Date().toDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Instructor</p>
          <p className="text-lg font-semibold">Dr. XYZ</p>
        </div>
      </div>

      <button 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.print()}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateTemplate;