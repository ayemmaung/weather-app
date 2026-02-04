import { searchCityData } from "@/services/search";
import { SearchContextProviderProps, SearchContextType } from "@/types/search";
import { createContext, useContext, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const searchCity = async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(false);

    try {
      const data = await searchCityData(query);

      console.log("data==>", data);
      setResults(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const value = {
    loading,
    error,
    results,
    searchCity,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
