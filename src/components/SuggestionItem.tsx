import { useWeatherContext } from "@/context/useWeatherContext";
import { SuggestionItemProps } from "@/types/suggestion";

const SuggestionItem = (props: SuggestionItemProps) => {
  const { setLocation } = useWeatherContext();
  return (
    <li
      className="suggestion"
      onClick={() => {
        props.hideSuggestions();
        setLocation(props);
      }}
    >
      {props.name}
    </li>
  );
};

export default SuggestionItem;
