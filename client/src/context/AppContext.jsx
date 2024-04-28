/* Manage fetching data logic using useReducer and Context API */
import { createContext, useContext, useReducer } from "react";
const AppContext = createContext();

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  synonymsData: [],
  dictionaryData: [],
  createdWord: false,
  isLoading: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "synonyms/loaded":
      return {
        ...state,
        synonymsData: action.payload,
        isLoading: false,
      };
    case "word/created":
      return {
        ...state,
        isLoading: false,
        createdWord: action.payload,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "dictionaryData/loaded":
      return {
        ...state,
        isLoading: false,
        dictionaryData: action.payload,
      };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
};
function AppProvider({ children }) {
  const [
    { isLoading, synonymsData, dictionaryData, error, createdWord },
    dispatch,
  ] = useReducer(reducer, initialState);

  /* Find all synonyms  */
  const findSynonyms = async (activeSearch) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `${BASE_URL}/words/search?word=${activeSearch}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let data = await response.json();
      dispatch({ type: "synonyms/loaded", payload: data?.result });
    } catch (err) {
      dispatch({ type: "error", payload: true });
    }
  };

  /* And new word */
  const addWordToDictionary = async (word, synonyms) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/words`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: word, synonyms: synonyms }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let data = await response.json();
      dispatch({ type: "word/created", payload: true });
    } catch (err) {
      dispatch({ type: "error", payload: true });
    }
  };
  /* Get all dictionary data */
  const getAllDictionaryData = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/words`);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let data = await response.json();
      dispatch({ type: "dictionaryData/loaded", payload: data?.result });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: true });
    }
  };
  return (
    <AppContext.Provider
      value={{
        synonymsData,
        dictionaryData,
        createdWord,
        isLoading,
        error,
        dispatch,
        findSynonyms,
        addWordToDictionary,
        getAllDictionaryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("App Context was used outside the AppProvider");
  return context;
}

export { AppProvider, useAppContext };
