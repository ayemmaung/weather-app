import { useSearchContext } from "@/context/useSearchContext";
import Loading from "@/ui/Loading";
import SuggestionItem from "@components/SuggestionItem";
import LoadingIcon from "@assets/images/icon-loading.svg";
import { SuggestionListProps } from "@/types/suggestion";

const SuggestionList = ({
  hideSuggestions,
  selectedIndex,
  updateSelectedIndex,
}: SuggestionListProps) => {
  const { loading, results, error } = useSearchContext();
  console.log("results: ", results);

  if (error) {
    return (
      <ul className="suggestions-list">
        <li className="suggestion error">Failed to load suggestions</li>
      </ul>
    );
  }

  if (loading) {
    return (
      <ul className="suggestions-list">
        <Loading
          className="search-loading-container"
          icon={LoadingIcon}
          placeholder="Search in progress"
        />
      </ul>
    );
  }

  if (results.length === 0) {
    return (
      <ul className="suggestions-list">
        <li className="suggestion text-(--neutral-300) px-2 py-2">
          No results found
        </li>
      </ul>
    );
  }

  return (
    <ul className="suggestions-list">
      {results.map((result, index) => {
        const { id } = result;
        return (
          <SuggestionItem
            key={id}
            {...result}
            hideSuggestions={hideSuggestions}
            isSelected={index === selectedIndex}
            updateSelectedIndex={() => updateSelectedIndex(index)}
          />
        );
      })}
    </ul>
  );
};

export default SuggestionList;
