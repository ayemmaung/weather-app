import { HourlyForecastCardProps } from "@/types/weather";
import Card from "@/ui/Card";
import SunnyWeatherIcon from "@assets/images/icon-sunny.webp";

const HourlyForecastCard = ({
  time,
  temperature,
  icon,
}: HourlyForecastCardProps) => {
  return (
    <Card className="hourly-forecast-item-card">
      <div className="hourly-forecast-item-card-left">
        {icon && (
          <img
            width={15}
            src={icon}
            alt="Weather Icon"
            className="hourly-forecast-card-weather-icon weather-icon"
          />
        )}
        <div className="hourly-forecast-time">{time || ""}</div>
      </div>
      <div className="hourly-forecast-item-card-right">
        <div className="hourly-forecast-temp">
          {temperature || ""}
          {temperature ? "°" : ""}
        </div>
      </div>
    </Card>
  );
};

export default HourlyForecastCard;
