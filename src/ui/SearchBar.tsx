import { useState } from "react";
import SearchIcon from "@assets/images/icon-search.svg";
import Button from "./Button";
import SuggestionList from "@/components/SuggestionList";
import { useSearchContext } from "@/context/useSearchContext";

type SearchBarProps = {
  placeholder?: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { searchCity } = useSearchContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");

  const focusInput = () => {
    const inputElement = document.querySelector(
      ".search-bar-input",
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchOnClick();
    }
  };

  const handleSearchOnClick = () => {
    if (query && query.length > 1) {
      searchCity(query);
      setShowSuggestions(true);
    }
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <img
          width={20}
          className="search-icon"
          src={SearchIcon}
          alt="Search Icon"
          onClick={focusInput}
        />
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />

        {showSuggestions && (
          <SuggestionList hideSuggestions={hideSuggestions} />
        )}
      </div>
      <Button
        className="search-btn"
        placeholder="Search"
        onClick={handleSearchOnClick}
      />
    </div>
  );
};

export default SearchBar;
