import { useWeatherContext } from "@/context/useWeatherContext";
import Card from "@/ui/Card";
import Loading from "@/ui/Loading";
import { normalizeCurrentForecast } from "@/utils/formatingData";
import TodayWeatherOverviewCard from "@components/WeatherCard/TodayWeatherOverviewCard";

const TodayWeatherOverview = () => {
  const { loading, weatherData, timeZone } = useWeatherContext();

  if (loading || !weatherData) {
    return (
      <div className="today-weather-overview">
        <Card className="today-weather-overview-card">
          <Loading />
        </Card>
      </div>
    );
  }
  const { current, current_units } = weatherData;
  const currentWeather = normalizeCurrentForecast({
    current,
    units: current_units,
    timeZone,
  });

  console.log("Current weather:==>", currentWeather);

  return (
    <div className="today-weather-overview">
      <TodayWeatherOverviewCard {...currentWeather} />
    </div>
  );
};

export default TodayWeatherOverview;
