import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import bg from "../assets/book_1.avif";
import { useAppContext } from "../context/AppContext";
const Container = ({ children, searchTerm, setDisplaySynonyms }) => {
  /* Define the scroll behaviour */

  const { isLoading } = useAppContext();
  const refTop = useRef(null);
  const refBottom = useRef(null);

  useEffect(() => {
    if (searchTerm || isLoading) {
      refBottom?.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      const timeoutId = setTimeout(() => {
        refTop?.current?.scrollIntoView({ behavior: "smooth" });
        /*  setDisplaySynonyms(false); */
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isLoading]);

  const backgroundImageStyle = {
    backgroundImage: `url("${bg}")`,
  };

  return (
    <section className="relative">
      <div ref={refTop} />
      <div
        style={backgroundImageStyle}
        className="relative  bg-center min-h-screen h-auto bg-fixed bg-gray-700 bg-blend-multiply"
      >
        <Navbar />
        {children}
      </div>
      <div ref={refBottom} />
    </section>
  );
};

export default Container;
