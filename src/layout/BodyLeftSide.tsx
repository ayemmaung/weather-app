import TodayWeatherOverview from "@/components/TodayWeatherOverview";
import TodayWeatherDetails from "@/components/TodayWeatherDetails";
import DailyForecast from "@/components/DailyForecast";

const BodyLeftSide = () => {
  return (
    <div className="left-side">
      <div className="today-weather-section">
        <TodayWeatherOverview />
        <TodayWeatherDetails />
      </div>
      <div className="daily-forecast-section">
        <DailyForecast />
      </div>
    </div>
  );
};

export default BodyLeftSide;
