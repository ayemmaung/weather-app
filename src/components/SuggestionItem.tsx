import { useWeatherContext } from "@/context/useWeatherContext";
import { SuggestionItemProps } from "@/types/suggestion";

const SuggestionItem = ({
  isSelected,
  hideSuggestions,
  updateSelectedIndex,
  ...props
}: SuggestionItemProps) => {
  const { setLocation } = useWeatherContext();
  const { name } = props;
  return (
    <li
      className={`suggestion ${isSelected ? "highlight" : ""}`}
      onMouseEnter={updateSelectedIndex}
      onClick={() => {
        hideSuggestions();
        setLocation(props);
      }}
    >
      {name}
    </li>
  );
};

export default SuggestionItem;
