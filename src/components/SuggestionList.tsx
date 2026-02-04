import { useSearchContext } from "@/context/useSearchContext";
import Loading from "@/ui/Loading";
import SuggestionItem from "@components/SuggestionItem";
import LoadingIcon from "@assets/images/icon-loading.svg";
import { SuggestionListProps } from "@/types/suggestion";

const SuggestionList = ({ hideSuggestions }: SuggestionListProps) => {
  const { loading, results } = useSearchContext();
  console.log("results: ", results);
  return (
    <ul className="suggestions-list">
      {loading ? (
        <Loading
          className="search-loading-container"
          icon={LoadingIcon}
          placeholder="Search in progress"
        />
      ) : (
        results.map((result) => {
          const { id } = result;
          return (
            <SuggestionItem
              key={id}
              {...result}
              hideSuggestions={hideSuggestions}
            />
          );
        })
      )}
    </ul>
  );
};

export default SuggestionList;
