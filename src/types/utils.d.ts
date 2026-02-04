import {
  HourlyWeather,
  DailyWeather,
  CurrentWeather,
  CurrentUnits,
} from "./weather";

export interface GroupHourlyByDayParams {
  hourly: HourlyWeather;
  timeZone?: string;
}

export interface NormalizeDailyForecastParams {
  daily: DailyWeather;
  timeZone?: string;
}

export interface NormalizeCurrentForecastParams {
  current: CurrentWeather;
  units: CurrentUnits;
  timeZone?: string;
}
