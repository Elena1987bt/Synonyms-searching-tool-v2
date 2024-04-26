import React from "react";
import LoaderGif from "../assets/Loader.gif.gif";

const Loader = () => {
  return (
    <div className=" ">
      <center>
        <img src={LoaderGif} className="h-20 " alt="" />
      </center>
    </div>
  );
};

export default Loader;
