import { useWeatherContext } from "@/context/useWeatherContext";
import { TodayWeatherOverviewProps } from "@/types/weather";
import Card from "@/ui/Card";

const TodayWeatherOverviewCard = ({
  date,
  icon,
  temperature,
  temperatureUnit,
}: TodayWeatherOverviewProps) => {
  const { location } = useWeatherContext();
  const { name, country } = location;

  return (
    <Card showBgImage={true} className="today-weather-overview-card">
      <div className="today-weather-overview card-header">
        <div className="today-weather-overview card-label">
          {name}, {country}
        </div>
        <div className="today-weather-overview card-date">{date}</div>
      </div>
      <div className="today-weather-overview card-body">
        <span className="today-weather-overview card-weather-icon-temp">
          <img
            width={15}
            src={icon}
            alt="Weather Icon"
            className="today-weather-overview card-weather-icon"
          />
          {temperature}
          {temperatureUnit || ""}
        </span>
      </div>
    </Card>
  );
};

export default TodayWeatherOverviewCard;
