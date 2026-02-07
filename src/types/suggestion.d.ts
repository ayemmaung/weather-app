import { MouseEventHandler } from "react";

export type SuggestionListProps = {
  selectedIndex?: number | string;
  hideSuggestions: Function;
  updateSelectedIndex: Function;
};

export type SuggestionItemProps = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
  isSelected?: boolean;
  hideSuggestions: Function;
  updateSelectedIndex: MouseEventHandler;
};
