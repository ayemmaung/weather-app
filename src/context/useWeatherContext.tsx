import { createContext, useContext, useEffect, useState } from "react";
import { formatDateWithTimezone } from "@/utils/formatDate";
import { fetchWeatherData as fetchWeatherService } from "@/services/weather";
import {
  Location,
  Units,
  WeatherContextProviderProps,
  WeatherContextType,
} from "@/types/weather";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (context === undefined) {
    throw new Error(
      "useWeatherContext must be used within WeatherContextProvider",
    );
  }

  return context;
};

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const [location, setLocation] = useState<Location>({
    name: "",
    country: "",
    longitude: null,
    latitude: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [units, setUnits] = useState<Units>({
    unit: "metric",
    wind: "",
    temperature: "",
    precipitation: "",
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toggleSelectedDay = (dayItem: { label: string; value: string }) => {
    if (dayItem) {
      setSelectedDay(dayItem);
    }
  };

  const toggleUnit = (unit: {
    groupKey: string;
    label: string;
    value: "metric" | "imperial";
  }) => {
    console.log("toggle unit==>", unit);
    if (unit.groupKey) {
      setUnits((prev) => ({
        ...prev,
        [unit.groupKey]: unit.value,
      }));
    }
  };

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDay = formatDateWithTimezone({
      isoString: new Date().toISOString(),
      timeZone: userTimeZone,
      options: {
        weekday: "long",
      },
    });
    setSelectedDay({ label: currentDay, value: currentDay.toLowerCase() });
    setTimeZone(userTimeZone);
  }, []);

  // wrapper around the weather service to manage local state
  const fetchWeatherData = async (
    loc: Location,
    units: Units,
    signal?: AbortSignal,
  ) => {
    if (!loc?.latitude || !loc?.longitude) return;
    setLoading(true);
    setError(false);
    try {
      const data = await fetchWeatherService(loc, units, signal);
      console.log("data==>", data);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      // ignore abort errors
      const isAbort =
        (err as any)?.name === "CanceledError" ||
        (err as any)?.code === "ERR_CANCELED" ||
        (err as any)?.message === "canceled";
      if (isAbort) return;
      setLoading(false);
      setError(true);
      console.error("fetchWeatherData error:", err);
    }
  };

  // call fetch when location or unit changes
  useEffect(() => {
    if (!location?.latitude || !location?.longitude) return;
    const controller = new AbortController();
    fetchWeatherData(location, units, controller.signal);
    return () => controller.abort();
  }, [location, units]);

  const value = {
    loading,
    error,
    location,
    weatherData,
    timeZone,
    selectedDay,
    units,

    setLocation,
    fetchWeatherData,
    toggleSelectedDay,
    toggleUnit,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
