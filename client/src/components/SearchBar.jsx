import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";

const SearchBar = ({ setDisplaySynonyms, setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState("");
  const { findSynonyms, dispatch } = useAppContext();
  /* Get the input from the search bar */
  const handleSearch = (e) => {
    if (e.target.value == "") {
      setSearchInput("");
      setSearchTerm(false);
      dispatch({
        type: "reset",
      });
    }
    setSearchInput(e.target.value.trim());
  };

  /*  handle Enter key press */
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (!searchInput) return;
      setDisplaySynonyms(true);
      setSearchTerm(true);
      await findSynonyms(searchInput);
    }
  };

  /*    findSynonyms function */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput) return;
    setDisplaySynonyms(true);
    setSearchTerm(true);
    await findSynonyms(searchInput);
  };
  return (
    <form className="md:w-[500px] mx-auto">
      <div className="relative">
        <input
          type="search"
          autoFocus
          placeholder="Type Here..."
          className="w-full p-4 rounded-full bg-white-800"
          onChange={(e) => handleSearch(e)}
          value={searchInput}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          className="absolute right-1 top-1/2 -translate-y-1/2 md:w-32 py-4 md:py-3 px-4 bg-blue-600 rounded-full text-white transform transition duration-500 hover:bg-blue-700"
        >
          <div className="flex items-center">
            <span className=""></span>
            <AiOutlineSearch />
            <span className="ml-3 text-md hidden md:block">Search</span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
