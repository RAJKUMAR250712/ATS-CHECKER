
import React from "react";

const WeakPointsCard = ({ data }) => {
  return (
    <div className="bg-red-50 p-5 rounded-xl shadow-md">

      <h2 className="text-xl font-bold text-red-600 mb-4">
        Weak Points
      </h2>

      <div className="flex flex-col gap-4">

        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-red-400"
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
            No weak points found
          </p>
        )}

      </div>
    </div>
  );
};

export default WeakPointsCard;