import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
const Button = ({ setOpenModal, setDisplaySynonyms }) => {
  return (
    <button
      onClick={() => {
        setOpenModal(true);
        setDisplaySynonyms(false);
      }}
      className="absolute text-semibold bottom-8 left-8 text-white text-4xl lg:text-5xl transform transition duration-500 hover:scale-110 hover:cursor-pointer"
    >
      <IoIosAddCircleOutline />
    </button>
  );
};

export default Button;
