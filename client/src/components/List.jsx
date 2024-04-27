import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import Card from "../components/Card";
import Loader from "./Loader";
const List = () => {
  const { dictionaryData, isLoading, error, getAllDictionaryData } =
    useAppContext();
  useEffect(() => {
    getAllDictionaryData();
  }, []);

  return (
    <div className="py-6 w-[70%] mx-auto ">
      <h1 className="mb-6 capitalize font-extrabold tracking-tight leading-none text-white text-2xl lg:text-4xl">
        Full content
      </h1>

      {isLoading ? (
        <div className="h-[65vh] flex flex-col text-center justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-red-300 text-2xl h-48 flex flex-col text-center justify-center items-center">
          Something went wrong! Try again! 😒
        </p>
      ) : (
        <div className="flex flex-wrap ">
          {dictionaryData?.map((el, i) => (
            <Card el={el} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
