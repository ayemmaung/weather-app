interface FormatDateWithTimezoneParams {
  isoString: string;
  timeZone?: string;
  options?: Intl.DateTimeFormatOptions;
}

export function formatDateWithTimezone({
  isoString,
  timeZone,
  options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  },
}: FormatDateWithTimezoneParams) {
  if (!isoString) return;

  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    ...options,
  });

  return formatter.format(date);
}
