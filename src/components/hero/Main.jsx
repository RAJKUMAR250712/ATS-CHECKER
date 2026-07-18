import React from "react";
import Text from "./Text";
import Card from "./Card";

const Main = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-7xl">
          <Text />
          <Card />
        </div>
      </div>
    </>
  );
};

export default Main;
