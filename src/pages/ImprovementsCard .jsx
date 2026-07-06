
import React from "react";

const ImprovementCard = ({ data }) => {
  return (
    <div className="bg-green-50 p-6 rounded-xl shadow-md w-full h-fit">

      <h2 className="text-xl font-bold text-green-600 mb-4">
        Improvements
      </h2>

      <div className="flex flex-col gap-4">

        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-green-400"
            >

              <h1 className="text-lg font-bold text-gray-800">
                {item.title}
              </h1>

              <p className="text-gray-600 mt-2">
                {item.desc}
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No improvements found
          </p>
        )}

      </div>
    </div>
  );
};

export default ImprovementCard;