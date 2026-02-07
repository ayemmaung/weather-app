import { searchCityData } from "@/services/search";
import { SearchContextProviderProps, SearchContextType } from "@/types/search";
import { createContext, useContext, useRef, useState } from "react";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within SearchContextProvider",
    );
  }

  return context;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef("");

  const searchCity = async (query: string) => {
    setQuery(query);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError(false);
      return;
    }

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    lastQueryRef.current = query;

    try {
      setLoading(true);
      setError(false);

      const data = await searchCityData(query, controller.signal);

      if (lastQueryRef.current !== query) return;

      console.log("data==>", data);
      setResults(data.results ?? []);
      setLoading(false);
    } catch (err) {
      if (err.code !== "ERR_CANCELED") {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    query,
    results,
    searchCity,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
