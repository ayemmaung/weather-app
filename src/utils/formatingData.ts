import {
  GroupHourlyByDayParams,
  NormalizeCurrentForecastParams,
  NormalizeDailyForecastParams,
} from "@/types/utils";
import { formatDateWithTimezone } from "./formatDate";
import { WEATHER_CODE_MAP, WEATHER_KEYS_MAPPING } from "./mapping";

export function groupHourlyByDay({ hourly, timeZone }: GroupHourlyByDayParams) {
  const result = {};

  if (!hourly || !hourly?.time) return;

  console.log("time: ", hourly.time);

  hourly.time.forEach((isoTime, index) => {
    // Convert ISO time into user's timezone
    const date = new Date(isoTime);

    if (!isFinite(date.getTime())) {
      console.warn(`Invalid hourly time: ${isoTime}`);
      return;
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      weekday: "long",
      day: "2-digit",
      hour: "numeric",
      hour12: true,
    });

    const parts = formatter.formatToParts(date);
    const get = (type) => parts.find((p) => p.type === type)?.value;

    const dayKey = `${get("weekday").toLowerCase()}`;

    const hourLabel = `${get("hour")} ${get("dayPeriod")}`;

    if (!result[dayKey]) {
      result[dayKey] = [];
    }

    let weatherCode = hourly[WEATHER_KEYS_MAPPING.weather_status][index];

    result[dayKey].push({
      time: hourLabel,
      icon: WEATHER_CODE_MAP[weatherCode],
      temperature: hourly[WEATHER_KEYS_MAPPING.temperature][index],
    });
  });

  return result;
}

export function normalizeDailyForecast({
  daily,
  timeZone,
}: NormalizeDailyForecastParams) {
  return daily.time.map((dateString, index) => {
    const date = new Date(`${dateString}T00:00:00Z`);

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
    });

    const weather_code = daily[WEATHER_KEYS_MAPPING.weather_status][index];
    const dayLabel = isFinite(date.getTime())
      ? formatter.format(date)
      : String(dateString);

    return {
      date: dateString,
      day: dayLabel, // e.g. "Mon"
      icon: WEATHER_CODE_MAP[weather_code],
      maxTemp: daily[WEATHER_KEYS_MAPPING.max_temp][index],
      minTemp: daily[WEATHER_KEYS_MAPPING.min_temp][index],
    };
  });
}

export function normalizeCurrentForecast({
  current,
  units,
  timeZone,
}: NormalizeCurrentForecastParams) {
  const dateString = current[WEATHER_KEYS_MAPPING.date];
  const weather_code = current[WEATHER_KEYS_MAPPING.weather_status];

  const dateLabel = formatDateWithTimezone({ isoString: dateString, timeZone });

  return {
    date: dateLabel,
    icon: WEATHER_CODE_MAP[weather_code],
    temperature: current[WEATHER_KEYS_MAPPING.temperature],
    temperatureUnit: units[WEATHER_KEYS_MAPPING.temperature],
    feelsLike: current[WEATHER_KEYS_MAPPING.feels_like],
    humidity: current[WEATHER_KEYS_MAPPING.humidity],
    humidityUnit: units[WEATHER_KEYS_MAPPING.humidity],
    wind: current[WEATHER_KEYS_MAPPING.wind],
    windUnit: units[WEATHER_KEYS_MAPPING.wind],
    precipitation: current[WEATHER_KEYS_MAPPING.precipitation],
    precipitationUnit: units[WEATHER_KEYS_MAPPING.precipitation],
  };
}
