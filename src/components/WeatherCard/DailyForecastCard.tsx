import { DailyForecastCardProps } from "@/types/weather";
import Card from "@ui/Card";

const DailyForecastCard = ({
  day,
  icon,
  maxTemp,
  minTemp,
}: DailyForecastCardProps) => {
  return (
    <Card className="daily-forecast-card">
      {day && <div className="daily-forecast-card-header">{day}</div>}
      <div className="daily-forecast-card-body">
        {icon && (
          <img
            width={15}
            src={icon}
            alt="Weather Icon"
            className="daily-forecast-card-weather-icon weather-icon"
          />
        )}
      </div>
      {maxTemp && minTemp && (
        <div className="daily-forecast-card-footer">
          <div className="daily-forecast-card-temp high">
            {maxTemp || "N/A"}
            {maxTemp && "°"}
          </div>
          <div className="daily-forecast-card-temp low">
            {minTemp || "N/A"}
            {minTemp && "°"}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DailyForecastCard;
