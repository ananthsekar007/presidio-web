import moment from "moment";
import { HoaModel } from "..";

export const getLastDateOfMonth = (month: number): string => {
  return moment()
    .month(month || 0)
    .endOf("month")
    .format("DD");
};

export const getFinancialYearDates = (year: number, endMonth: number, startMonth: number): Date[] => {
  let endYear = startMonth == 0 ? year : year + 1;
  let startDate = new Date(Date.UTC(year, startMonth, 1));
  let endDate = new Date(Date.UTC(endYear, endMonth + 1, 0));

  return [startDate, endDate];
};

export const getFinancialYearRange = (year: number, endMonth: number, startMonth: number): string[] => {
  if (!(year != null && endMonth != null)) {
    return ["", ""];
  }
  let currentYear = null;
  if (moment().month() < startMonth) {
    currentYear = moment().year(year - 1);
  } else {
    currentYear = moment().year(year);
  }
  return [
    `${currentYear.month(getStartMonth(endMonth)).format("MMMM")} 1, ${currentYear
      .month(getStartMonth(endMonth))
      .format("YYYY")}`,
    `${currentYear
      .add(startMonth === 0 ? 0 : 1, "y")
      .month(endMonth)
      .format("MMMM")} ${getLastDateOfMonth(endMonth || 11)}, ${currentYear.month(endMonth).format("YYYY")}`,
  ];
};

export const getStartMonth = (endMonth: number) => {
  return endMonth + 1 >= 12 ? 0 : endMonth + 1;
};
