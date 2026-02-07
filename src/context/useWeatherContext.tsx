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

  const [initialLoading, setInitialLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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

  // wrapper around the weather service to manage local state
  const fetchWeatherData = async (
    loc: Location,
    units: Units,
    signal?: AbortSignal,
  ) => {
    if (!loc?.latitude || !loc?.longitude) return;

    setLoading(true);
    setError(false);

    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
      try {
        const data = await fetchWeatherService(loc, units, signal);
        console.log("data==>", data);
        setWeatherData(data);
        setLoading(false);
        setRetrying(false);
        return;
      } catch (err) {
        const isAbort =
          (err as any)?.name === "CanceledError" ||
          (err as any)?.code === "ERR_CANCELED" ||
          (err as any)?.message === "canceled";

        const status = (err as any)?.response?.status;
        const shouldRetry = !status || status >= 500;

        // ignore abort errors
        if (isAbort) {
          setLoading(false);
          setRetrying(false);
          return;
        }

        if (!shouldRetry) {
          setLoading(false);
          setError(true);
          return;
        }

        if (attempt === MAX_RETRIES) {
          setLoading(false);
          setError(true);
          setRetrying(false);
          console.error("Final weather fetch error:", err);
          return;
        }

        attempt++;
        setRetrying(true);

        // exponential backoff delay
        const delay = 500 * Math.pow(2, attempt);

        try {
          await Promise.race([
            sleep(delay),
            new Promise((_, reject) =>
              signal?.addEventListener("abort", () => reject("aborted")),
            ),
          ]);
        } catch {
          setLoading(false);
          setRetrying(false);
          return;
        }
      }
    }
  };

  // call fetch when location or unit changes
  useEffect(() => {
    if (!location?.latitude || !location?.longitude) return;
    const controller = new AbortController();
    fetchWeatherData(location, units, controller.signal);
    return () => controller.abort();
  }, [location, units]);

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

    const initialLoadingTimer = setTimeout(() => setInitialLoading(false), 500);

    return () => clearTimeout(initialLoadingTimer);
  }, []);

  const value = {
    initialLoading,
    loading,
    error,
    retrying,
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
