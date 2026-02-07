import { SearchCityResponse, SearchResponse } from "@/types/search";
import axios from "axios";

export const searchCityData = async (
  query: string,
  signal?: AbortSignal,
): Promise<SearchResponse> => {
  const base = import.meta.env.VITE_GEOCODING_URL;
  const params = new URLSearchParams({
    name: query,
    count: "4",
  });

  const { data } = await axios.get<SearchResponse>(base, { params, signal });
  return data;
};
