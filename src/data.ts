export const HEADER_DROPDOWN_OPTIONS = [
  {
    type: "toggle",
    groupKey: "unit",
    options: [
      { label: "Switch to Imperial", value: "imperial" },
      { label: "Switch to Metric", value: "metric" },
    ],
    children: [
      {
        title: "Temperature",
        groupKey: "temperature",
        options: [
          { label: "Celsius(°C)", value: "metric" },
          { label: "Fahrenheit(°F)", value: "imperial" },
        ],
      },
      {
        title: "Wind Speed",
        groupKey: "wind",
        options: [
          { label: "km/h", value: "metric" },
          { label: "mph", value: "imperial" },
        ],
      },
      {
        title: "Precipitation",
        groupKey: "precipitation",
        options: [
          { label: "Milimeters (mm)", value: "metric" },
          { label: "Inches (in)", value: "imperial" },
        ],
      },
    ],
  },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

export const DETAILS_CARDS = [
  { id: "feels_like", label: "Feels Like" },
  { id: "humidity", label: "Humidity" },
  { id: "wind", label: "Wind" },
  { id: "precipitation", label: "Precipitation" },
];
