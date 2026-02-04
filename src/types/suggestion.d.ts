export type SuggestionListProps = {
  hideSuggestions: Function;
};

export type SuggestionItemProps = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
  hideSuggestions: Function;
};
