import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoreCard from "./ScoreCard";
import WeakPointsCard from "./WeakPointsCard";
import ImprovementsCard from "./ImprovementsCard";
import MissingKeywordsCard from "./MissingKeywordsCard";
import SuggestionsCard from "./SuggestionsCard";

import { motion } from "framer-motion";

const Dashboard = () => {
  const location = useLocation();

  const [state, setState] = useState(location.state || null);

  // Restore data after page refresh
  useEffect(() => {
    if (location.state) {
      localStorage.setItem(
        "atsResult",
        JSON.stringify(location.state)
      );

      setState(location.state);
    } else {
      const savedData = localStorage.getItem("atsResult");

      if (savedData) {
        setState(JSON.parse(savedData));
      }
    }
  }, [location.state]);


  // Loading state
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-bold text-gray-600">
          No Data Found
        </h1>
      </div>
    );
  }


  // Safe Array Handler
  const safeArray = (data) => {
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  };


  // Safe Number Handler
  const safeNumber = (data) => {
    const num = Number(data);
    return isNaN(num) ? 0 : num;
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-4 sm:p-6 bg-gray-100 min-h-screen"
    >

      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full bg-white mb-6 py-6 rounded-xl shadow-md"
      >

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          ATS Dashboard
        </h1>


        <div className="mt-5">
          <ScoreCard 
            score={safeNumber(state.score)} 
          />
        </div>

      </motion.div>



      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <WeakPointsCard
            data={safeArray(state.weak_points)}
          />
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <ImprovementsCard
            data={safeArray(state.improvements)}
          />
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <MissingKeywordsCard
            data={safeArray(state.missing_keywords)}
          />
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <SuggestionsCard
            data={safeArray(state.suggestions)}
          />
        </motion.div>


      </div>


    </motion.div>
  );
};


export default Dashboard;