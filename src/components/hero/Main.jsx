import React from "react";
import Text from "./Text";
import Card from "./Card";

const Main = () => {
  return (
    <>
      <div className=" h-screen w-full flex flex-1 flex-col md:flex-row items-center justify-center  p-20 ">
        <div className="flex  h-full items-center justify-center gap-15  flex-col lg:flex-row">
          <Text />
          <Card />
        </div>
      </div>
    </>
  );
};

export default Main;
