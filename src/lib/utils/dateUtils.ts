export const toJalali = (gregorianDate: string): string => {
  if (!gregorianDate) return "";

  try {
    const date = new Date(gregorianDate);
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "persian",
    });

    return formatter.format(date);
  } catch {
    return "";
  }
};
