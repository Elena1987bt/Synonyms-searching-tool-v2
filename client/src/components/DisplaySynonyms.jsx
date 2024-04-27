import Loader from "./Loader";
import { useAppContext } from "../context/AppContext";

const DisplaySynonyms = () => {
  const { synonymsData, isLoading, error } = useAppContext();

  return (
    <div className="min-h-72 h-fit p-8 w-full bg-gray-950 text-gray-100  ">
      {isLoading ? (
        <div className="h-72 flex flex-col text-center justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-red-300 text-2xl h-72 flex flex-col text-center justify-center items-center">
          Something went wrong! Try again! 😒
        </p>
      ) : (
        <div className="">
          {synonymsData.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-72 w-full py-4 md:w-[70%] mx-auto">
              <h1 className=" font-bold tracking-tight  text-white text-xl lg:text-2xl  leading-7 ">
                🔝☝️ Explore our dictionary! ☝️🔝
              </h1>
            </div>
          ) : synonymsData?.synonyms?.length == 0 ? (
            <div className="py-4  h-72 w-full md:w-[70%] mx-auto">
              <h1 className="font-bold tracking-tight  text-white text-xl lg:text-2xl  leading-7">
                {" "}
                No synonyms found in our dictionary for{" "}
                <span className="italic text-blue-500 ">
                  {" "}
                  {synonymsData?.word}{" "}
                </span>
              </h1>
            </div>
          ) : synonymsData.word ? (
            <div className=" min-h-72 py-4 w-full md:w-[70%] mx-auto">
              <h1 className="font-bold tracking-tight  text-white text-xl lg:text-2xl  leading-7">
                Synonyms for the word
                <span className="italic text-blue-500 ">
                  {" "}
                  {synonymsData?.word}{" "}
                </span>
              </h1>
              <div className="flex mt-6 pb-16  flex-row flex-wrap w-full ">
                {synonymsData?.synonyms?.map((el, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 mt-4 text-slate-800 text-sm font-medium me-2 px-5 py-2.5 mr-4 rounded"
                  >
                    # {el}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DisplaySynonyms;
