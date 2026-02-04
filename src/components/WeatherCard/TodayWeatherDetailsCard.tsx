import { TodayWeatherDetailsCardProps } from "@/types/weather";
import Card from "@/ui/Card";

const TodayWeatherDetailsCard = ({
  label,
  value,
  unit,
}: TodayWeatherDetailsCardProps) => {
  return (
    <Card className="today-weather-details-card">
      <div className="today-weather-details-card card-label">{label}</div>
      <div className="today-weather-details-card card-value">
        {/* {value || value !== 0 || "-"} {value || value !== 0 ? unit : ""} */}
        {value} {unit}
      </div>
    </Card>
  );
};

export default TodayWeatherDetailsCard;
