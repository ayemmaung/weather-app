import { DETAILS_CARDS } from "@/data";
import TodayWeatherDetailsCard from "./WeatherCard/TodayWeatherDetailsCard";
import { useWeatherContext } from "@/context/useWeatherContext";
import { WEATHER_KEYS_MAPPING } from "@/utils/mapping";

const TodayWeatherDetails = () => {
  const { weatherData } = useWeatherContext();

  return (
    <div className="today-weather-details">
      {DETAILS_CARDS.map((detail) => {
        const { id } = detail;
        const KEY = WEATHER_KEYS_MAPPING[id];
        let value: number;
        let unit: string;

        if (weatherData) {
          const { current, current_units } = weatherData;
          value = current[KEY];
          unit = current_units[KEY];
        }

        return (
          <TodayWeatherDetailsCard
            key={id}
            {...detail}
            value={value}
            unit={unit}
          />
        );
      })}
    </div>
  );
};

export default TodayWeatherDetails;
