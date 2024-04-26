const SynonymField = ({
  synonyms,
  addSynonym,
  removeSynonym,
  maxSynonyms,
  inputRefTwo,
  word,
  userInput,
  setUserInput,
}) => {
  /* Handle input onChange */
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  /* handle Enter key press */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSynonym(e);
    }
  };
  const handleAddSynonym = (e) => {
    e.preventDefault(); /* Prevent form submission or new line creation */
    if (
      userInput.trim() !== "" &&
      userInput.length <= 20 &&
      synonyms.length < maxSynonyms
    ) {
      addSynonym(userInput);
      setUserInput(""); /* Clear the input after adding a synonym */
    }
  };

  return (
    <div className="flex flex-col w-full md:w-[400px] my-4">
      <div className="flex rounded-md ">
        <input
          name="keyword_synonyms"
          type="text"
          placeholder={
            synonyms?.length < maxSynonyms
              ? "Add a tag"
              : `You can only enter max. of ${maxSynonyms} synonyms`
          }
          className={`w-full border border-gray-300  px-4 py-3 ${
            userInput ? "rounded-l-md" : "rounded-md"
          }`}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          value={userInput}
          disabled={
            synonyms.length === maxSynonyms ||
            (word.length == 0 && userInput == 0 && synonyms.length == 0)
          }
          ref={inputRefTwo}
        />
        {userInput && (
          <button
            className="bg-blue-600 text-2xl text-white rounded-r-md px-4"
            onClick={handleAddSynonym}
          >
            +
          </button>
        )}
      </div>

      {/* Render the synonyms here  */}

      <div className="flex flex-row flex-wrap gap-3 mt-5 mb-3">
        {synonyms.map((synonym, index) => (
          <span
            key={`${index}-${synonym}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
          >
            {synonym}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeSynonym(synonym)}
              title={`Remove ${synonym}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SynonymField;
