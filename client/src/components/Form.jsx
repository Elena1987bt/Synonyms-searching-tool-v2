import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import SynonymField from "./SynonymField";
import Loader from "./Loader";

const Form = () => {
  const { createdWord, isLoading, error, addWordToDictionary, dispatch } =
    useAppContext();

  /* track the use input for synonyms */
  const [userInput, setUserInput] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [word, setWord] = useState("");
  /* track input field error */
  const [inputError, setInputError] = useState("");

  const inputRef = useRef(null);
  const inputRefTwo = useRef(null);

  /*    Handle input onChange */
  const handleWordChange = (e) => {
    setWord(e.target.value);
  };
  /*   define the MaxSynonyms */
  const MAX_SYNONYMS = 10;

  /*    Function to handle adding the synonym to the array */
  const handleAddSynonym = (newSynonym) => {
    if (
      newSynonym &&
      !synonyms.includes(newSynonym) &&
      synonyms.length < MAX_SYNONYMS
    ) {
      setSynonyms([...synonyms, newSynonym]);
    }
  };
  /*  handle word input Enter key press */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRefTwo?.current?.focus();
    }
  };
  /*    Function to remove synonym from array */
  const handleRemoveSynonym = (synonym) => {
    setSynonyms((prevSynonyms) => prevSynonyms.filter((t) => t !== synonym));
    if (synonyms.length === 1) {
      inputRef.current.focus();
    }
  };

  /* Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word.length === 0) {
      setInputError("Word field must not be empty!");
      return;
    }
    if (synonyms.length === 0) {
      setInputError("Word must have at least one synonym!");
      return;
    }
    if (word.length === 0 && synonyms.length === 0) {
      setInputError((prev) => "You must fill all the fields!");
      return;
    }
    /*   Run to backend */
    addWordToDictionary(word, synonyms);
    setWord("");
    setSynonyms([]);
    setUserInput("");
  };
  /* SetTimeout to remove input err message */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInputError("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [inputError]);
  /*   SetTimeout to remove success message */
  useEffect(() => {
    if (createdWord) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: "reset" });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [createdWord]);
  return (
    <form className="flex flex-col w-full md:w-[400px]">
      <input
        autoFocus
        name="word"
        type="text"
        placeholder="Add a word"
        className="w-full border border-gray-300 rounded-md px-4 py-3"
        onKeyDown={handleKeyPress}
        onChange={handleWordChange}
        value={word}
        ref={inputRef}
      />
      <SynonymField
        synonyms={synonyms}
        addSynonym={handleAddSynonym}
        removeSynonym={handleRemoveSynonym}
        maxSynonyms={MAX_SYNONYMS}
        inputRefTwo={inputRefTwo}
        word={word}
        userInput={userInput}
        setUserInput={setUserInput}
      />
      <button
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-800 text-white p-3 rounded outline-none border-none transform transition duration-300  hover:bg-blue-600 "
      >
        Submit
      </button>
      {createdWord && (
        <h1
          className="my-10  text-center   tracking-tight leading-2 text-green-900 text-md lg:text-xl
        "
        >
          Success!
          <br />
          <p className="mt-2 text-3xl">👏👏👏</p>
        </h1>
      )}
      {inputError && <p className="text-red-200 mt-10">* {inputError}</p>}
      {error && <p className="text-red-200 mt-10">* {error}</p>}
      {isLoading && <Loader />}
    </form>
  );
};

export default Form;
