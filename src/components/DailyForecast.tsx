import { DAYS } from "@/data";
import DailyForecastCard from "./WeatherCard/DailyForecastCard";
import { useWeatherContext } from "@/context/useWeatherContext";
import { normalizeDailyForecast } from "@/utils/formatingData";
import { DailyForecastCardProps } from "@/types/weather";

const DailyForecast = () => {
  const { weatherData, timeZone } = useWeatherContext();
  let dailyData: DailyForecastCardProps[] = [];

  if (weatherData) {
    const { daily } = weatherData;
    dailyData = normalizeDailyForecast({ daily, timeZone });
    console.log("dailyData:==> ", dailyData);
  }

  return (
    <>
      <div className="daily-forecast-title sub-title">Daily Forecast</div>
      <div className="daily-forecast-cards-container">
        {DAYS.map((_, index) => {
          return <DailyForecastCard key={index} {...dailyData[index]} />;
        })}
      </div>
    </>
  );
};

export default DailyForecast;
