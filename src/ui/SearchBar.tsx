import { useState } from "react";
import SearchIcon from "@assets/images/icon-search.svg";
import Button from "./Button";
import SuggestionList from "@/components/SuggestionList";
import { useSearchContext } from "@/context/useSearchContext";
import { useWeatherContext } from "@/context/useWeatherContext";

type SearchBarProps = {
  placeholder?: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { setLocation } = useWeatherContext();
  const { query, results, searchCity } = useSearchContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
    searchCity(value);
    setShowSuggestions(value.trim().length > 1);
    setSelectedIndex(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null || prev === results.length - 1 ? 0 : prev + 1,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null || prev === 0 ? results.length - 1 : prev - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        handleSearchOnClick();
        break;
    }
  };

  const handleSearchOnClick = () => {
    let selectedItem = results[0];
    if (selectedIndex !== null && results[selectedIndex]) {
      selectedItem = results[selectedIndex];
    }

    if (selectedItem) {
      setLocation(selectedItem);
      setShowSuggestions(false);
    }
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
    setSelectedIndex(null);
  };

  const updateSelectedIndex = (index: number) => {
    setSelectedIndex(index);
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
          value={query}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />

        {showSuggestions && (
          <SuggestionList
            hideSuggestions={hideSuggestions}
            selectedIndex={selectedIndex}
            updateSelectedIndex={updateSelectedIndex}
          />
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
