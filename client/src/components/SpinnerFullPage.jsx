import React from "react";
import Loader from "./Loader";

const SpinnerFullPage = () => {
  return (
    <div className="bg-gray-950 h-screen flex flex-col justify-center items-center">
      <Loader />
    </div>
  );
};

export default SpinnerFullPage;
