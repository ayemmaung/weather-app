// src/services/weather.ts
import axios from "axios";
import type { OpenMeteoResponse, Units } from "types/weather";

export const fetchWeatherData = async (
  location: { latitude: number; longitude: number },
  units: Units,
  signal?: AbortSignal,
): Promise<OpenMeteoResponse> => {
  const base = import.meta.env.VITE_OPEN_METEO_URL;
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,apparent_temperature",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  });
  if (units.unit === "imperial") {
    params.set("wind_speed_unit", "mph");
    params.set("temperature_unit", "fahrenheit");
    params.set("precipitation_unit", "inch");
  }

  if (units.wind === "imperial") params.set("wind_speed_unit", "mph");
  if (units.temperature === "imperial")
    params.set("temperature_unit", "fahrenheit");
  if (units.precipitation === "imperial")
    params.set("precipitation_unit", "inch");

  const url = `${base}?${params.toString()}`;
  const { data } = await axios.get<OpenMeteoResponse>(url, { signal });
  return data;
};
