import { HourlyForecastItem } from "@/types/weather";
import HourlyForecastCard from "./WeatherCard/HourlyForecastCard";

const HourlyForecast = ({ hourlyForecast }) => {
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
