

import React from "react";

const SuggestionCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-lg w-full">

      <h2 className="text-2xl font-bold text-purple-700 mb-5">
        Suggestions
      </h2>

      <div className="flex flex-col gap-4">

        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-400"
            >

              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-bold">
                #{index + 1}
              </span>

              <h1 className="text-lg font-bold text-gray-800 mt-2">
                {item.title}
              </h1>

              <p className="text-gray-700 mt-2">
                {item.desc}
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No suggestions available
          </p>
        )}

      </div>
    </div>
  );
};

export default SuggestionCard;