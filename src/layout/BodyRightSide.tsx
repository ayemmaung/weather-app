import HourlyForecast from "@/components/HourlyForecast";
import { useWeatherContext } from "@/context/useWeatherContext";
import Card from "@/ui/Card";
import Dropdown from "@/ui/Dropdown";
import { groupHourlyByDay } from "@/utils/formatingData";

const DAYS_OPTIONS = [
  {
    options: [
      { label: "Monday", value: "monday" },
      { label: "Tuesday", value: "tuesday" },
      { label: "Wednesday", value: "wednesday" },
      { label: "Thursday", value: "thursday" },
      { label: "Friday", value: "friday" },
      { label: "Saturday", value: "saturday" },
      { label: "Sunday", value: "sunday" },
    ],
  },
];

const BodyRightSide = () => {
  const { selectedDay, toggleSelectedDay } = useWeatherContext();

  return (
    <div className="right-side">
      <div className="hourly-forecast-section">
        <Card className="hourly-forecast-card">
          <div className="hourly-forecast-header">
            <div className="hourly-forecast-header-title sub-title">
              Hourly forecast
            </div>
            <Dropdown
              placeholder={selectedDay ? selectedDay.label : ""}
              options={DAYS_OPTIONS}
              selectedValue={selectedDay ? selectedDay.value : ""}
              onChange={toggleSelectedDay}
            />
          </div>
          <HourlyForecast />
        </Card>
      </div>
    </div>
  );
};

export default BodyRightSide;
