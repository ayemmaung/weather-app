import { HourlyForecastItem } from "@/types/weather";
import HourlyForecastCard from "./WeatherCard/HourlyForecastCard";
import { useWeatherContext } from "@/context/useWeatherContext";
import { groupHourlyByDay } from "@/utils/formatingData";

const HourlyForecast = () => {
  const { selectedDay, weatherData, timeZone } = useWeatherContext();

  let hourlyForecast: HourlyForecastItem[] = [];

  if (weatherData) {
    const { hourly = null } = weatherData;

    const groupedHourly = groupHourlyByDay({ hourly, timeZone }) || {};

    if (selectedDay) {
      hourlyForecast = groupedHourly[selectedDay.value];
    }
    console.log("groupedHourly: ", groupedHourly);
  }

  return (
    <div className="hourly-forecast-body">
      {!hourlyForecast
        ? Array.from({ length: 8 }).map((_, index: number) => {
            return <HourlyForecastCard key={index} />;
          })
        : hourlyForecast.map((forecast: HourlyForecastItem, index: number) => {
            return <HourlyForecastCard key={index} {...forecast} />;
          })}
    </div>
  );
};

export default HourlyForecast;
