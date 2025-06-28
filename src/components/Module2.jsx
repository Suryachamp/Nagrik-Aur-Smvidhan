import React from "react";

const Module2 = ({ onComplete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Module 2: Fundamental Rights</h2>

      <p className="mb-2">
        The Indian Constitution grants Fundamental Rights to ensure individual liberty and equality. These rights safeguard citizens from state interference and uphold justice in a democratic society.
      </p>

      <h3 className="text-lg font-semibold mb-2">Key Fundamental Rights:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><strong>Right to Equality (Articles 14-18):</strong> Ensures equality before the law and prohibits discrimination.</li>
        <li><strong>Right to Freedom (Articles 19-22):</strong> Guarantees speech, expression, and personal liberty.</li>
        <li><strong>Right against Exploitation (Articles 23-24):</strong> Prohibits human trafficking and forced labor.</li>
        <li><strong>Right to Freedom of Religion (Articles 25-28):</strong> Allows individuals to practice, profess, and propagate any religion.</li>
        <li><strong>Cultural and Educational Rights (Articles 29-30):</strong> Protects the rights of minorities to preserve their culture.</li>
        <li><strong>Right to Constitutional Remedies (Article 32):</strong> Allows individuals to approach the Supreme Court for enforcement of their rights.</li>
      </ul>

      <p className="mb-4">
        These rights form the foundation of India's democracy and empower citizens against arbitrary actions.
      </p>

      <button 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
        onClick={onComplete}
      >
        Complete Module 2
      </button>
    </div>
  );
};

export default Module2;