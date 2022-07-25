export const addDays = (date: Date, days: number) => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};
