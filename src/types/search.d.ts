export interface SearchContextType {
  loading?: boolean;
  error?: boolean;
  query?: string;
  results?: SearchResult[];
  searchCity?: Function;
}

export interface SearchContextProviderProps {
  children: React.ReactNode;
}

export interface SearchCityResponse {
  [key: string]: any;
}

export type SearchResponse = {
  results: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: {
      source: string;
      parsedValue: number;
    };
    feature_code: string;
    country_code: string;
    admin1_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
  }[];
};

export interface SearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
}
