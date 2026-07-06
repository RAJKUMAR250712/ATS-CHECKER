


import React from "react";

const MissingCard = ({ data }) => {
  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md w-full h-fit">

      <h2 className="text-xl font-bold text-yellow-600 mb-4">
        Missing Keywords
      </h2>

      <div className="flex flex-wrap gap-2">

        {data && data.length > 0 ? (
          data.map((item, index) => (
            <span
              key={index}
              className="bg-white px-3 py-1 rounded-full shadow text-gray-700 text-sm border border-yellow-300 hover:bg-yellow-100 transition"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-gray-500">
            No missing keywords found
          </p>
        )}

      </div>
    </div>
  );
};

export default MissingCard;