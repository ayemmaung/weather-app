export interface OpenMeteoResponse {
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m?: number[];
    weather_code?: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    weather_code?: number[];
  };
  current: {
    temperature_2m?: number[];
    weather_code?: number[];
  };
}

export type WeatherContextType = {
  loading?: boolean;
  error?: boolean;
  location?: Location;
  weatherData?: WeatherDataType;
  timeZone?: string;
  selectedDay?: { label: string; value: string };
  units?: Units;
  setLocation?: Function;
  fetchWeatherData: Function;
  toggleSelectedDay: Function;
  toggleUnit: Function;
};

export interface WeatherContextProviderProps {
  children: React.ReactNode;
}

export type Location = {
  name: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
};

export type Unit = "metric" | "imperial" | "";

export type Units = {
  unit: Unit;
  wind: Unit;
  temperature: Unit;
  precipitation: Unit;
};

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  icon: string;
}

export type DailyForecastCardProps = {
  day: string;
  icon?: string;
  maxTemp?: number;
  minTemp?: number;
};

export type HourlyForecastCardProps = {
  time?: string;
  temperature?: number;
  icon?: string;
};

export type TodayWeatherDetailsCardProps = {
  label: string;
  value?: number;
  unit?: string;
};

export type TodayWeatherOverviewProps = {
  date?: string;
  icon?: string;
  temperature?: number;
  temperatureUnit?: string;
};

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation: string;
  weather_code: string;
  wind_speed_10m: string;
  apparent_temperature: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  apparent_temperature: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherDataType {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: CurrentUnits;
  current: CurrentWeather;

  hourly_units: HourlyUnits;
  hourly: HourlyWeather;

  daily_units: DailyUnits;
  daily: DailyWeather;
}

export interface HourlyItem {
  time: string;
  temperature_2m: number;
  weather_code: number;
}
