

import React from "react";
import { useLocation } from "react-router-dom";

import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import WeakPointsCard from "./WeakPointsCard";
import ImprovementsCard from "./ImprovementsCard ";
import MissingKeywordsCard from "./MissingKeywordsCard";
import SuggestionsCard from "./SuggestionsCard ";

const Dashboard = () => {
  const { state } = useLocation();

  console.log("STATE:", state);

  if (!state) {
    return <h1 className="p-6">No Data Found</h1>;
  }

  // ✅ SAFE ARRAY HANDLER
  const safeArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return [];
  };

  // ✅ SAFE STRING HANDLER (IMPORTANT FOR SUMMARY ISSUE)
  const safeString = (data) => {
    if (typeof data === "string" && data.trim().length > 0) {
      return data;
    }
    return "No summary available";
  };

  // ✅ SAFE NUMBER HANDLER (IMPORTANT FOR SCORE ISSUE)
  const safeNumber = (data) => {
    const num = Number(data);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     <div className="flex flex-col items-center w-full bg-white mb-6 py-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">
        ATS Dashboard
      </h1>

      {/* SCORE FIX */}
      <ScoreCard score={safeNumber(state.score)} />
     </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        {/* SUMMARY FIX */}
        {/* <SummaryCard summary={safeString(state.summary)} /> */}

        <WeakPointsCard data={safeArray(state.weak_points)} />

        <ImprovementsCard data={safeArray(state.improvements)} />

        <MissingKeywordsCard data={safeArray(state.missing_keywords)} />

        <SuggestionsCard data={safeArray(state.suggestions)} />

      </div>

    </div>
  );
};

export default Dashboard;