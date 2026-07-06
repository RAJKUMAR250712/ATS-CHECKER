


import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const ScoreCard = ({ score }) => {

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#4F46E5", "#E5E7EB"],
        borderWidth: 0,
        cutout: "70%", // 🔥 circle thin banane ke liye
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false, // clean UI
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center w-[220px]">

      <h2 className="font-bold text-lg mb-4">
        ATS Score
      </h2>

      <div className="w-36 h-36 relative">

        <Doughnut data={data} options={options} />

        {/* Center Score */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-indigo-600">
          {score}%
        </div>

      </div>

    </div>
  );
};

export default ScoreCard;