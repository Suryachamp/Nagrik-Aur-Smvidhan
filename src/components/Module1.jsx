import React from "react";

const Module1 = ({ onComplete }) => {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Module 1: Legal Explanation (Concept & Principles)</h2>
      
      <p className="mb-2">
        <strong>Definition & Purpose:</strong> Article 14 of the Indian Constitution guarantees <strong>equality before the law</strong> and <strong>equal protection of the laws</strong> within India. It ensures justice and fairness in a democratic society.
      </p>
      
      <h3 className="text-lg font-semibold mt-4">Two Key Principles:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>
          <strong>Equality before the law:</strong> Derived from <em>English Common Law</em>, ensuring that no one is above the law.
        </li>
        <li>
          <strong>Equal protection of the laws:</strong> An <em>American concept</em> ensuring that individuals in similar situations receive equal treatment.
        </li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4">Reasonable Classification:</h3>
      <p className="mb-2">
        Article 14 does not mean absolute equality. The Constitution allows for <strong>reasonable classification</strong> to address inequalities. Examples include:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Tax slabs based on income.</li>
        <li>Special provisions for women, children, and marginalized communities like SCs and STs.</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4">Conditions for Classification:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>It must have a <strong>legitimate purpose</strong>.</li>
        <li>There must be a <strong>rational connection</strong> between the classification and the objective it seeks to achieve.</li>
      </ul>
      
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        onClick={onComplete}
      >
        Complete Module 1
      </button>
    </div>
  );
};

export default Module1;