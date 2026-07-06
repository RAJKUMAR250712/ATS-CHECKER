


import React from "react";

const SummaryCard = ({ result }) => {

  const summary = result
    ?.split(".")                     // sentence split
    .map(s => s.trim())
    .find(s =>
      s.toLowerCase().includes("resume") ||
      s.toLowerCase().includes("candidate") ||
      s.toLowerCase().includes("structured")
    );

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full h-fit">

      <h2 className="text-xl font-bold text-blue-600 mb-3">
        Summary
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {summary ? summary + "." : "No summary found"}
      </p>

    </div>
  );
};

export default SummaryCard;