import SunnyWeatherIcon from "@assets/images/icon-sunny.webp";
import CloudyWeatherIcon from "@assets/images/icon-partly-cloudy.webp";
import OvercastWeatherIcon from "@assets/images/icon-overcast.webp";
import FogWeatherIcon from "@assets/images/icon-fog.webp";
import DrizzleWeatherIcon from "@assets/images/icon-drizzle.webp";
import RainWeatherIcon from "@assets/images/icon-rain.webp";
import SnowWeatherIcon from "@assets/images/icon-snow.webp";
import StormWeatherIcon from "@assets/images/icon-storm.webp";

export const WEATHER_KEYS_MAPPING: Record<string, string> = {
  interval: "interval",
  precipitation: "precipitation",
  humidity: "relative_humidity_2m",
  temperature: "temperature_2m",
  max_temp: "temperature_2m_max",
  min_temp: "temperature_2m_min",
  date: "time",
  weather_status: "weather_code",
  wind: "wind_speed_10m",
  feels_like: "apparent_temperature",
};

export const WEATHER_CODE_MAP: Record<number, string> = {
  0: SunnyWeatherIcon,
  1: SunnyWeatherIcon,
  2: CloudyWeatherIcon,
  3: OvercastWeatherIcon,

  45: FogWeatherIcon,
  48: FogWeatherIcon,

  51: DrizzleWeatherIcon,
  53: DrizzleWeatherIcon,
  55: DrizzleWeatherIcon,
  56: DrizzleWeatherIcon,
  57: DrizzleWeatherIcon,

  61: RainWeatherIcon,
  63: RainWeatherIcon,
  65: RainWeatherIcon,
  66: RainWeatherIcon,
  67: RainWeatherIcon,

  71: SnowWeatherIcon,
  73: SnowWeatherIcon,
  75: SnowWeatherIcon,
  77: SnowWeatherIcon,

  80: RainWeatherIcon,
  81: RainWeatherIcon,
  82: StormWeatherIcon,

  85: SnowWeatherIcon,
  86: SnowWeatherIcon,

  95: StormWeatherIcon,
  96: StormWeatherIcon,
  99: StormWeatherIcon,
};
