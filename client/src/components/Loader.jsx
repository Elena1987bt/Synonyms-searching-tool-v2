import React from "react";
import LoaderGif from "../assets/Loader.gif.gif";

const Loader = () => {
  return (
    <div>
      <img src={LoaderGif} className="h-20 " alt="" />
    </div>
  );
};

export default Loader;
